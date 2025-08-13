import { render, screen, fireEvent } from '@testing-library/react';
import useEmblaCarousel from 'embla-carousel-react';
import { Carousel } from './Carousel';
import type { TMDBMovie } from '../../types';
import { vi, Mock } from 'vitest';

vi.mock('embla-carousel-react', () => ({ default: vi.fn() }));

describe('Carousel', () => {
  const movies: TMDBMovie[] = [
    { id: 1, title: 'A', imageUrl: '/a.jpg'},
    { id: 2, title: 'B', imageUrl: '/b.jpg'},
  ];

  const renderItem = (m: TMDBMovie) => <span>{m.title}</span>;

  it('renders title and items, applies className', () => {
    const emblaApi = { scrollPrev: vi.fn(), scrollNext: vi.fn() };
    (useEmblaCarousel as unknown as Mock).mockReturnValue([vi.fn(), emblaApi]);

    const { container } = render(
      <Carousel
        name="Trending"
        items={movies}
        getKey={(m) => m.id}
        renderItem={renderItem}
        className="extra"
      />
    );

    
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(container.querySelector('.embla')).toHaveClass('extra');
  });

  it('clicking Prev/Next calls embla api', () => {
    const emblaApi = { scrollPrev: vi.fn(), scrollNext: vi.fn() };
    (useEmblaCarousel as unknown as Mock).mockReturnValue([vi.fn(), emblaApi]);

    render(
      <Carousel
        name="Any"
        items={movies}
        getKey={(m) => m.id}
        renderItem={renderItem}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /prev/i }));
    expect(emblaApi.scrollPrev).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(emblaApi.scrollNext).toHaveBeenCalledTimes(1);
  });
});
