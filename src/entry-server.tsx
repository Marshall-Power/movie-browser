import { renderToString } from 'react-dom/server';
import { Router } from './router';
import { WishlistProvider } from './store';

export async function render({ url, initialData }: { url: string; initialData: any }) {
  const app = (
    <WishlistProvider>
      <Router url={url} initialData={initialData} />
    </WishlistProvider>
  );
  const html = renderToString(app);
  const head = ''; // add meta later if you want
  return { html, head };
}
