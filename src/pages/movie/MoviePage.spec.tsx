import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { MoviePage } from './MoviePage';
import { MovieDetails } from '../../types';

vi.mock('../../store', () => ({
  useWishlist: () => ({
    items: [
      { id: 1, title: 'Current Movie', imageUrl: '/cur.jpg' },
      { id: 2, title: 'Another Movie', imageUrl: '/a.jpg' },
    ],
  }),
}));

const mockCallbackRef = vi.fn();
vi.mock('../../hooks', () => ({
  useTMDBImageSize: <T,>() => [mockCallbackRef as unknown as React.RefCallback<T>, 'w780'] as const,
}));

vi.mock('../../components', () => {
  return {
    Header: () => <div data-testid="header" />,
    ImageArea: (props: any) => <div data-testid="image-area" data-props={JSON.stringify(props)} />,
    DescriptionArea: () => <div data-testid="description-area" />,
    AdditionalInfo: (props: any) => (
      <div data-testid="additional-info" data-props={JSON.stringify(props)} />
    ),

    Carousel: ({ items, getKey, renderItem }: any) => (
      <div data-testid="carousel">
        {items.map((it: any, i: number) => (
          <div data-testid="carousel-item" key={getKey(it, i)}>
            {renderItem(it, i)}
          </div>
        ))}
      </div>
    ),

    Card: ({ id, title, imageUrl, href, ariaCurrent }: any) =>
      href ? (
        <a data-testid={`card-${id}`} href={href} aria-current={ariaCurrent}>
          {title}-{imageUrl}
        </a>
      ) : (
        <div data-testid={`card-${id}`} aria-current={ariaCurrent}>
          {title}-{imageUrl}
        </div>
      ),
  };
});

const baseMovie = {
  id: 1,
  title: 'Current Movie',
  poster_path: '/p.jpg',
  backdrop_path: '/b.jpg',
  release_date: '2017-10-06',
  runtime: 163,
  genres: [{ name: 'Science Fiction' }],
  popularity: 123.56,
  budget: 1000,
  revenue: 2_500_000.5,
  spoken_languages: [
    { iso_639_1: 'en', name: 'English', english_name: 'English' },
    { iso_639_1: 'es', name: 'Español', english_name: 'Spanish' },
  ],
};

describe('MoviePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when movie is missing', () => {
    const { container } = render(<MoviePage themeKey="scifi" movie={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders header, image area, and description area with theme class', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie as MovieDetails} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('image-area')).toBeInTheDocument();
    expect(screen.getByTestId('description-area')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toHaveClass('movie-detail', 'theme--scifi');
  });

  it('passes poster/backdrop/title and size (from hook) to ImageArea', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie as MovieDetails} />);

    const imgArea = screen.getByTestId('image-area');
    const props = JSON.parse(imgArea.getAttribute('data-props') || '{}');

    expect(props.title).toBe('Current Movie');
    expect(props.posterPath).toBe('/p.jpg');
    expect(props.backdropPath).toBe('/b.jpg');
    expect(props.size).toBe('w780');
  });

  it('renders AdditionalInfo with movie props', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie as MovieDetails} />);

    const node = screen.getByTestId('additional-info');
    expect(node).toBeInTheDocument();

    const props = JSON.parse(node.getAttribute('data-props') || '{}');
    expect(props.movie.id).toBe(1);
    expect(props.movie.runtime).toBe(163);
    expect(props.movie.popularity).toBeCloseTo(123.56);
    expect(props.movie.spoken_languages).toHaveLength(2);
  });

  it('renders wishlist carousel items from the store', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie as MovieDetails} />);

    const carousel = screen.getByTestId('carousel');
    const items = within(carousel).getAllByTestId('carousel-item');
    expect(items).toHaveLength(2);
  });

  it('omits href for the current movie and keeps href for others', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie as MovieDetails} />);

    const currentCard = screen.getByTestId('card-1');
    expect(currentCard.tagName.toLowerCase()).toBe('div');
    expect(currentCard).not.toHaveAttribute('href');

    const otherCard = screen.getByTestId('card-2');
    expect(otherCard.tagName.toLowerCase()).toBe('a');
    expect(otherCard).toHaveAttribute('href', '/movie/2');
  });
});
