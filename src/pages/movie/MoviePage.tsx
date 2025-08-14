import { Header, ImageArea, DescriptionArea } from '../../components';
import { MovieDetails } from '../../types';

interface MoviePageProps {
  themeKey: string;
  movie: MovieDetails;
}

export function MoviePage({ themeKey, movie }: MoviePageProps) {
  if (!movie) return null;
  console.log(movie);
  const { title, poster_path, backdrop_path } = movie;

  return (
    <>
      <Header />
      <main className={`movie-detail theme--${themeKey}`}>
        <div className="movie-detail__grid">
          <div className="movie-detail__image">
            <ImageArea
              title={title}
              posterPath={poster_path}
              backdropPath={backdrop_path}
              size="w780"
            />
          </div>

          <div className="movie-detail__description">
            <DescriptionArea movie={movie} themeKey={themeKey} />
          </div>
        </div>

        <section className="movie-detail__additional" aria-labelledby="additional-heading">
          <h2 id="additional-heading" className="visually-hidden">
            Additional information
          </h2>
        </section>
      </main>
    </>
  );
}
