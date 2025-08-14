import { Header, ImageArea, DescriptionArea, Carousel, Card } from '../../components';
import { useTMDBImageSize } from '../../hooks';
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
  const [imageRef, imgSize] = useTMDBImageSize<HTMLDivElement>();

  return (
    <>
      <Header />
      <main className={`movie-detail theme--${themeKey}`}>
        <div className="movie-detail__grid">
          <div ref={imageRef} className="movie-detail__image">
            <ImageArea
              title={title}
              posterPath={poster_path}
              backdropPath={backdrop_path}
              size={imgSize}
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
            renderItem={({ id, title, imageUrl }) => {
              const href = id === currentId ? undefined : `/movie/${id}`;
              return <Card id={id} title={title} imageUrl={imageUrl} href={href} />;
            }}
          />
        </section>
      </main>
    </>
  );
}
