import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './Card';

describe('Card', () => {
  const defaultProps = {
    id: 1,
    title: 'Test Movie',
    imageUrl: '/test.jpg',
  };

  it('renders title and image', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByRole('heading', { name: /test movie/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test movie/i })).toHaveAttribute('src', '/test.jpg');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Card {...defaultProps} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /view details for test movie/i }));
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  it('renders inside a Link when href is provided', () => {
    render(
      <MemoryRouter>
        <Card {...defaultProps} href="/movie/1" />
      </MemoryRouter>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/1');
  });

  it('shows error placeholder on image error', () => {
    render(<Card {...defaultProps} />);
    const img = screen.getByRole('img', { name: /test movie/i });
    fireEvent.error(img);
    expect(screen.getByText(/image not available/i)).toBeInTheDocument();
  });

  it('adds is-loaded class when image loads', () => {
    render(<Card {...defaultProps} />);
    const img = screen.getByRole('img', { name: /test movie/i });
    fireEvent.load(img);
    expect(screen.getByRole('button')).toHaveClass('card');
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
