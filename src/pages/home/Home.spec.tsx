import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';
import type { HomeInitialData } from '../../types';

const mockData: HomeInitialData = [
  {
    name: 'Trending',
    movies: [
      { id: 1, title: 'Movie One', imageUrl: '/one.jpg' },
      { id: 2, title: 'Movie Two', imageUrl: '/two.jpg' },
    ],
  },
  {
    name: 'Top Rated',
    movies: [{ id: 3, title: 'Movie Three', imageUrl: '/three.jpg' }],
  },
  {
    name: 'Upcoming',
    movies: [{ id: 4, title: 'Movie Four', imageUrl: '/four.jpg' }],
  },
];

vi.mock('../../components', () => ({
  Header: () => <header>Mock Header</header>,
  Carousel: ({ name, items }: any) => (
    <section>
      <h2>{name}</h2>
      {items.map((item: any) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </section>
  ),
  Card: () => null,
}));

const renderHome = (data = mockData) => {
  return render(
    <MemoryRouter>
      <Home initialData={data} />
    </MemoryRouter>,
  );
};

describe('Home', () => {
  it('renders the header', () => {
    renderHome();
    expect(screen.getByText(/mock header/i)).toBeInTheDocument();
  });

  it('renders a carousel for each category', () => {
    renderHome();
    expect(screen.getByText(/trending/i)).toBeInTheDocument();
    expect(screen.getByText(/top rated/i)).toBeInTheDocument();
    expect(screen.getByText(/upcoming/i)).toBeInTheDocument();
  });

  it('renders movies inside each carousel', () => {
    renderHome();
    expect(screen.getByText(/movie one/i)).toBeInTheDocument();
    expect(screen.getByText(/movie three/i)).toBeInTheDocument();
    expect(screen.getByText(/movie four/i)).toBeInTheDocument();
  });
});
