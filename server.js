import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';
const safeSerialize = (data) => {
  return JSON.stringify(data).replace(/</g, '\\u003c');
};
function readTheme(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/(?:^|;\s*)theme=(light|dark)/);
  return m?.[1] || 'dark'; // default
}

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';

// Create http server
const app = express();

// Add Vite or respective production middlewares
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

async function tmdb(path) {
  const res = await fetch(`https://api.themoviedb.org/3${path}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error(`TMDB ${path} failed: ${res.status}`);
  return res.json();
}

app.get('/api/movies', async (_req, res) => {
  try {
    const [popular, topRated, upcoming] = await Promise.all([
      tmdb('/movie/popular?language=en-US&page=1'),
      tmdb('/movie/top_rated?language=en-US&page=1'),
      tmdb('/movie/upcoming?language=en-US&page=1'),
    ]);
    res.json({ popular, topRated, upcoming });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to fetch TMDB home data' });
  }
});

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    /** @type {string} */
    let template;
    /** @type {import('./src/entry-server.ts').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const apiRes = await fetch(`http://localhost:${port}/api/movies`);
    const MoviesData = await apiRes.json();
    const TMDB_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    function mapTMDBData(data) {
      return Object.entries(data).map(([categoryName, categoryData]) => ({
        name: categoryName,
        movies: categoryData.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          imageUrl: `${TMDB_BASE_URL}${movie.poster_path}`,
        })),
      }));
    }

    const mappedMoviesData = mapTMDBData(MoviesData);

    const theme = readTheme(req);
    const rendered = await render({ _url: url, initialData: mappedMoviesData });
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
      .replace('data-theme="%THEME%"', `data-theme="${theme}"`)
      .replace(
        `<!--ssr-data-->`,
        `<script>window.__INITIAL_DATA__=${safeSerialize(rendered.initialData)}</script>`,
      );

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
