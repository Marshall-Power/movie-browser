import { Home, MoviePage } from '../pages';
import { MovieDetails, TMDBMovie } from '../types';

type InitialData =
  | { kind: 'home'; payload: { categories: Array<{ name: string; movies: TMDBMovie[] }> } }
  | { kind: 'movie'; payload: { movie: MovieDetails; themeKey: string } };

export const Router = ({ initialData }: { url: string; initialData: InitialData }) => {
  if (initialData.kind === 'home') {
    return <Home initialData={initialData.payload.categories} />;
  }
  if (initialData.kind === 'movie') {
    const { movie, themeKey } = initialData.payload;
    return <MoviePage movie={movie} themeKey={themeKey} />;
  }
  return null;
}
