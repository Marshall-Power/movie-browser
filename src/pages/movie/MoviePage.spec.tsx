import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MoviePage } from './MoviePage';


vi.mock('../../store', () => ({
  useWishlist: () => ({
    items: [
      { id: 1, title: 'Current Movie', imageUrl: '/cur.jpg' },
      { id: 2, title: 'Another Movie', imageUrl: '/a.jpg' },
    ],
  }),
}));

vi.mock('../../components', () => {
  return {
    Header: () => <div data-testid="header" />,
    ImageArea: (props: any) => <div data-testid="image-area" data-props={JSON.stringify(props)} />,
    DescriptionArea: () => <div data-testid="description-area" />,
    
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
} as any;

describe('MoviePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders header, image area, and description area with theme class', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie} />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('image-area')).toBeInTheDocument();
    expect(screen.getByTestId('description-area')).toBeInTheDocument();

    const main = screen.getByRole('main');
    expect(main).toHaveClass('movie-detail', 'theme--scifi');
  });

  it('passes poster/backdrop/title to ImageArea', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie} />);

    const imgArea = screen.getByTestId('image-area');
    const props = JSON.parse(imgArea.getAttribute('data-props') || '{}');

    expect(props.title).toBe('Current Movie');
    expect(props.posterPath).toBe('/p.jpg');
    expect(props.backdropPath).toBe('/b.jpg');
    expect(props.size).toBe('w780');
  });

  it('renders wishlist carousel items from the store', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie} />);

    const carousel = screen.getByTestId('carousel');
    const items = within(carousel).getAllByTestId('carousel-item');
    expect(items).toHaveLength(2); 
  });

  it('omits href for the current movie in the carousel and keeps href for others', () => {
    render(<MoviePage themeKey="scifi" movie={baseMovie} />);

    
    const currentCard = screen.getByTestId('card-1');
    expect(currentCard.tagName.toLowerCase()).toBe('div');
    expect(currentCard).not.toHaveAttribute('href');

   
    const otherCard = screen.getByTestId('card-2');
    expect(otherCard.tagName.toLowerCase()).toBe('a');
    expect(otherCard).toHaveAttribute('href', '/movie/2');
  });
});
