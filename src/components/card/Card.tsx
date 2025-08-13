import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  title: string;
  imageUrl: string;
  onClick?: (id: number) => void;
  className?: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  title,
  imageUrl,
  onClick,
  className = '',
  href,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  React.useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [imageUrl]);

  const handleClick = () => onClick?.(id);

  const content = (
    <div
      className={`card ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      <div
        className={`card__image-container${loaded ? ' is-loaded' : ''}${errored ? ' is-error' : ''}`}
      >
        {!errored ? (
          <>
            {!loaded && <div className="card__image--loading" aria-hidden="true" />}
            <img
              key={imageUrl}
              src={imageUrl}
              alt={title}
              className="card__image"
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => {
                setErrored(true);
                setLoaded(true);
              }}
            />
          </>
        ) : (
          <div className="card__placeholder">
            <div>
              <div>Image not available</div>
            </div>
          </div>
        )}
      </div>

      <div className="card__content">
        <h3 className="card__title">{title}</h3>
      </div>
    </div>
  );

  return href ? <Link to={href}> {content}</Link> : content;
};
