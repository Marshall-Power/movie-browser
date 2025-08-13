
import { renderToString } from 'react-dom/server';
import { Router } from './router';

export async function render({ url, initialData }: { url: string; initialData: any }) {
  const app = <Router url={url} initialData={initialData} />;
  const html = renderToString(app);
  const head = ''; // add meta later if you want
  return { html, head };
}
