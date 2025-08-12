import './styles/main.scss';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Router initialData={window.__INITIAL_DATA__} />
    </BrowserRouter>
  </StrictMode>,
);
