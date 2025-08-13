type ImageAreaProps = {
  title: string;
  posterPath?: string | null;
  backdropPath?: string | null; 
  size?: 'w500' | 'w780' | 'w1280' | 'original';
};

const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p';


export const ImageArea = ({ title, posterPath, backdropPath, size = 'w780' }: ImageAreaProps) => {
  const path = backdropPath || posterPath || null;
  const src = path ? `${TMDB_IMG_BASE}/${size}${path}` : null;

  
  const width = size === 'w500' ? 500 : size === 'w1280' ? 1280 : size === 'original' ? 1280 : 780;
  const height = Math.round((width * 9) / 16);

  return (
    <section className="image-area" aria-label="Poster">
      {src ? (
        <img
          src={src}
          alt={`Poster of ${title}`}
          width={width}
          height={height}
          loading="eager"
          decoding="sync"
        />
      ) : (
        <div
          className="image-area__placeholder"
          role="img"
          aria-label={`No poster available for ${title}`}
        >
          No poster
        </div>
      )}
    </section>
  );
};
