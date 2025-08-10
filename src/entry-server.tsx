import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Router } from './router';

interface RenderPropType {
  _url: string;
  initialData: any;
}

export function render({ _url, initialData }: RenderPropType) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
        <Router initialData={initialData} />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, initialData };
}
