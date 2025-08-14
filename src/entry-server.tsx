import { renderToString } from 'react-dom/server';
import { Router } from './router/Router';
import { WishlistProvider } from './store';
import { MovieDetails, TMDBCategoryData } from './types';

type InitialDataProps =
  | {
      kind: 'home';
      payload: {
        categories: TMDBCategoryData[];
      };
    }
  | {
      kind: 'movie';
      payload: {
        movie: MovieDetails;
        themeKey: string;
      };
    };

const headForTheme = (themeKey?: string) => {
  if (themeKey === 'default') {
    return `<link rel="preload" href="/fonts/inter/Inter-Regular.woff2"
                  as="font" type="font/woff2" crossorigin>`;
  }
  return '';
};

export async function render({ url, initialData }: { url: string; initialData: InitialDataProps }) {
  const app = (
    <WishlistProvider>
      <Router url={url} initialData={initialData} />
    </WishlistProvider>
  );
  const html = renderToString(app);
  const themeKey = initialData.kind === 'movie' ? initialData.payload.themeKey : 'default';
  const head = headForTheme(themeKey);
  return { html, head };
}
