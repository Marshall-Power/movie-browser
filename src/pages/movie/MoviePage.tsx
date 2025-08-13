import { Header } from '../../components';
import { MovieDetails } from '../../types';

interface MoviePageProps {
  themeKey: string;
  movie: MovieDetails;
}

export function MoviePage({ themeKey, movie }: MoviePageProps) {
  if (!movie) return null;
  console.log(movie);

  return (
    <>
      <Header />
      <main className={`theme--${themeKey}`}>
      </main>
    </>
  );
}
