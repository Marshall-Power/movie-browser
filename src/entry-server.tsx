import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Router } from './router';

interface RenderPropType {
  _url: string;
}

export function render({ _url }: RenderPropType) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={_url}>
        <Router />
      </StaticRouter>
    </StrictMode>,
  );
  return { html };
}
