import { Home, MoviePage } from '../pages';
import { MovieDetails } from '../types';

type InitialData =
  | { kind: 'home'; payload: { categories: Array<{ name: string; movies: any[] }> } }
  | { kind: 'movie'; payload: { movie: MovieDetails; themeKey: string } };

export function Router({ initialData }: { url: string; initialData: InitialData }) {
  if (initialData.kind === 'home') {
    return <Home initialData={initialData.payload.categories} />;
  }
  if (initialData.kind === 'movie') {
    const { movie, themeKey } = initialData.payload;
    return <MoviePage movie={movie} themeKey={themeKey} />;
  }
  return null;
}
