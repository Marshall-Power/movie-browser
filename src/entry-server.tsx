import { renderToString } from 'react-dom/server';
import { Router } from './router';
import { WishlistProvider } from './store';

function headForTheme(themeKey?: string) {
  if (themeKey === 'default') {
    return `<link rel="preload" href="/fonts/inter/Inter-Regular.woff2"
                  as="font" type="font/woff2" crossorigin>`;
  }
  return '';
}

export async function render({ url, initialData }: { url: string; initialData: any }) {
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
