import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DescriptionArea } from './DescriptionArea';
import * as wishlistStore from '../../store';

const baseMovie = {
  id: 42,
  title: 'Test Movie',
  release_date: '2025-08-14',
  runtime: 120,
  genres: [{ name: 'Action' }, { name: 'Drama' }],
  overview: 'This is a test movie overview.',
  poster_path: '/poster.jpg',
};

describe('DescriptionArea', () => {
  const add = vi.fn();
  const remove = vi.fn();
  const has = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(wishlistStore, 'useWishlist').mockReturnValue({ add, remove, has } as any);
  });

  it('renders title, meta data and overview', () => {
    has.mockReturnValue(false);
    render(<DescriptionArea movie={baseMovie} themeKey="action" />);

    expect(screen.getByRole('heading', { name: /test movie/i })).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('120 min')).toBeInTheDocument();
    expect(screen.getByText('Action, Drama')).toBeInTheDocument();
    expect(screen.getByText(/test movie overview/i)).toBeInTheDocument();
  });

  it('shows "Add to wishlist" when movie not in wishlist', () => {
    has.mockReturnValue(false);
    render(<DescriptionArea movie={baseMovie} />);
    expect(screen.getByRole('button', { name: /add to wishlist/i })).toBeInTheDocument();
  });

  it('shows "Remove from wishlist" when movie is in wishlist', () => {
    has.mockReturnValue(true);
    render(<DescriptionArea movie={baseMovie} />);
    expect(screen.getByRole('button', { name: /remove from wishlist/i })).toBeInTheDocument();
  });

  it('clicking add calls add() with correct payload', () => {
    has.mockReturnValue(false);
    render(<DescriptionArea movie={baseMovie} themeKey="action" />);
    fireEvent.click(screen.getByRole('button', { name: /add to wishlist/i }));
    expect(add).toHaveBeenCalledWith({
      id: 42,
      title: 'Test Movie',
      imageUrl: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      genreKey: 'action',
    });
  });

  it('clicking remove calls remove() with correct id', () => {
    has.mockReturnValue(true);
    render(<DescriptionArea movie={baseMovie} />);
    fireEvent.click(screen.getByRole('button', { name: /remove from wishlist/i }));
    expect(remove).toHaveBeenCalledWith(42);
  });

  it('disables button when id is null', () => {
    has.mockReturnValue(false);
    render(<DescriptionArea movie={{ ...baseMovie, id: null as any }} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
