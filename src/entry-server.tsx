import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Router } from './router';
import type { HomeInitialData } from './types';

interface RenderPropType {
  _url: string;
  initialData: HomeInitialData;
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
