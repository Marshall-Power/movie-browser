import { Home, MoviePage } from '../pages';
import { MovieDetails } from '../types'; 

type InitialData =
  | { kind: 'home'; payload: { categories: Array<{ name: string; movies: any[] }> } }
  | { kind: 'movie'; payload: { movie: MovieDetails } };

export function Router({ initialData }: { url: string; initialData: InitialData }) {
  if (initialData.kind === 'home') {
    return <Home initialData={initialData.payload.categories} />;
  }
  if (initialData.kind === 'movie') {
    const { movie } = initialData.payload;
    return <MoviePage {...movie} />;
  }
  return null;
}
