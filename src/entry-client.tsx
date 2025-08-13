import './styles/main.scss';
import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';

const initialData = window.__INITIAL_DATA__;
const url = window.location.pathname + window.location.search;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <BrowserRouter>
      <Router url={url} initialData={initialData} />
    </BrowserRouter>
  </StrictMode>,
);
