import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { Router } from './Router';

vi.mock('../pages', () => ({
  Home: ({ initialData }: any) => (
    <div data-testid="home" data-props={JSON.stringify(initialData)} />
  ),
  MoviePage: ({ movie, themeKey }: any) => (
    <div
      data-testid="movie"
      data-movie={JSON.stringify(movie)}
      data-theme={themeKey}
    />
  ),
}));

const categories = [
  { name: 'Action', movies: [{ id: 1, title: 'A', imageUrl: '/a.jpg' }] },
  { name: 'Drama', movies: [{ id: 2, title: 'B', imageUrl: '/a.jpg' }] },
];

const movie = {
  id: 42,
  title: 'The Answer',
  poster_path: '/p.jpg',
  backdrop_path: '/b.jpg',
} as any;

describe('Router', () => {
  it('renders Home when kind=home and passes categories', () => {
    render(<Router url="/" initialData={{ kind: 'home', payload: { categories } }} />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
    expect(home.getAttribute('data-props')).toBe(JSON.stringify(categories));
    expect(screen.queryByTestId('movie')).not.toBeInTheDocument();
  });

  it('renders MoviePage when kind=movie and passes movie + themeKey', () => {
    render(
      <Router
        url="/movie/42"
        initialData={{ kind: 'movie', payload: { movie, themeKey: 'scifi' } }}
      />
    );
    const mv = screen.getByTestId('movie');
    expect(mv).toBeInTheDocument();
    expect(mv.getAttribute('data-movie')).toBe(JSON.stringify(movie));
    expect(mv.getAttribute('data-theme')).toBe('scifi');
    expect(screen.queryByTestId('home')).not.toBeInTheDocument();
  });
});
