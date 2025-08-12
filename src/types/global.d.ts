import type { HomeInitialData } from './tmdb';

declare global {
  interface Window {
    __INITIAL_DATA__?: HomeInitialData;
  }
}

export {};
