import { Header, ImageArea, DescriptionArea, Carousel, Card } from '../../components';
import { MovieDetails } from '../../types';
import { useWishlist } from '../../store';

interface MoviePageProps {
  themeKey: string;
  movie: MovieDetails;
}

export function MoviePage({ themeKey, movie }: MoviePageProps) {
  if (!movie) return null;
  const { id, title, poster_path, backdrop_path } = movie;
  const currentId = id;
  const { items } = useWishlist();

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
          <h2 id="additional-heading">Wishlist</h2>

          <Carousel
            key={title}
            items={items}
            getKey={(m) => m.id}
            renderItem={({ id, title, name, imageUrl }) => {
              const href = id === currentId ? undefined : `/movie/${id}`;
              const cardTitle = title ?? name ?? '';
              return <Card id={id} title={cardTitle} imageUrl={imageUrl} href={href} />;
            }}
          />
        </section>
      </main>
    </>
  );
}
