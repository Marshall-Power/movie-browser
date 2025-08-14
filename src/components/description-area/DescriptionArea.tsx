import { useWishlist } from '../../store';
import { Button } from '../../components';

type DescriptionAreaProps = {
  movie: {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    release_date?: string;
    runtime?: number;
    genres?: Array<{ name?: string }>;
    overview?: string;
  };
  themeKey?: string;
};

export const DescriptionArea = ({ movie, themeKey = 'default' }: DescriptionAreaProps) => {
  const { add, has, remove } = useWishlist();
  const { id, title, name, poster_path, release_date, runtime } = movie;

  const showTitle = title ?? name ?? '';
  const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '';

  const year = release_date ? release_date.slice(0, 4) : null;
  const runtimeText = runtime ? `${runtime} min` : null;
  const genresText =
    movie?.genres
      ?.map((genre) => genre?.name)
      .filter(Boolean)
      .join(', ') || null;

  const meta = [year, runtimeText, genresText].filter(Boolean) as string[];
  const isAdded = id != null ? has(id) : false;

  const handleClick = () => {
    if (id == null) return;
    const item = { id, title, imageUrl: poster, genreKey: themeKey };
    if (isAdded) remove(id);
    else add(item);
  };

  return (
    <section className="description-area">
      <h1 className="description-area__title">{showTitle}</h1>

      {meta.length > 0 && (
        <ul className="description-area__meta">
          {meta.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      )}

      {movie?.overview && <p className="description-area__overview">{movie.overview}</p>}

      <Button
        className="btn--wishlist"
        aria-pressed={isAdded}
        onClick={handleClick}
        disabled={id == null}
      >
        {isAdded ? 'Remove from wishlist' : 'Add to wishlist'}
      </Button>
    </section>
  );
};
