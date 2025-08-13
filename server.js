import fs from 'node:fs/promises';
import express from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const safeSerialize = (data) =>
  JSON.stringify(data).replace(/[<\u2028\u2029]/g, (c) =>
    c === '<' ? '\\u003c' : c === '\u2028' ? '\\u2028' : '\\u2029',
  );

function readTheme(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/(?:^|;\s*)theme=(light|dark)/);
  return m?.[1] || 'dark'; // default
}

function genreToThemeKey(genres) {
  const g = (genres?.[0]?.name || '').toLowerCase();
  if (/(action|adventure|war)/.test(g)) return 'action';
  if (/(comedy|family|animation)/.test(g)) return 'comedy';
  if (/(drama|romance|history|music)/.test(g)) return 'drama';
  if (/(horror|thriller|crime)/.test(g)) return 'horror';
  if (/(science fiction|sci[-\s]?fi|fantasy)/.test(g)) return 'scifi';
  return 'default';
}

const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';

const app = express();

/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

async function tmdb(pathAndQuery) {
  const res = await fetch(`https://api.themoviedb.org/3${pathAndQuery}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error(`TMDB ${pathAndQuery} failed: ${res.status}`);
  return res.json();
}

const TMDB_BASE_IMAGE = 'https://image.tmdb.org/t/p/w500';

function mapTMDBHomeData(home) {
  return Object.entries(home).map(([name, data]) => ({
    name,
    movies: (data?.results ?? []).map(({ id, title, name, poster_path }) => ({
      id: id,
      title: title ?? name ?? '',
      imageUrl: poster_path ? `${TMDB_BASE_IMAGE}${poster_path}` : '',
    })),
  }));
}

app.get(/^(?!\/api\/).*/, async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');
    const { pathname } = new URL(req.originalUrl, `http://${req.headers.host}`);

    let initialData;
    const movieMatch = pathname.match(/^\/movie\/(\d+)$/);

    if (pathname === '/') {
      const [popular, topRated, upcoming] = await Promise.all([
        tmdb('/movie/popular?language=en-US&page=1'),
        tmdb('/movie/top_rated?language=en-US&page=1'),
        tmdb('/movie/upcoming?language=en-US&page=1'),
      ]);
      const categories = mapTMDBHomeData({
        Popular: popular,
        'Top Rated': topRated,
        Upcoming: upcoming,
      });
      initialData = { kind: 'home', payload: { categories } };
    } else if (movieMatch) {
      const id = movieMatch[1];
      const movie = await Promise.resolve(tmdb(`/movie/${id}?language=en-US`));
      const themeKey = genreToThemeKey(movie.genres);
      initialData = { kind: 'movie', payload: { movie, themeKey } };
    } else {
      res.redirect(302, '/');
      return;
    }

    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const theme = readTheme(req);
    const { html, head } = await render({ url, initialData });

    const out = template
      .replace('<!--app-head-->', head ?? '')
      .replace('<!--app-html-->', html ?? '')
      .replace('data-theme="%THEME%"', `data-theme="${theme}"`)
      .replace(
        '<!--ssr-data-->',
        `<script>window.__INITIAL_DATA__=${safeSerialize(initialData)}</script>`,
      );

    res.status(200).setHeader('Content-Type', 'text/html').end(out);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e);
    console.error(e.stack || e);
    res.status(500).end('Internal Server Error');
  }
});

// === Start server ===
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
