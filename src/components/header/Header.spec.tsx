import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'light';
    document.cookie = '';
  });

  it('renders brand link', () => {
    render(<Header />);
    const brandLink = screen.getByRole('link', { name: /moviebrowser/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders toggle button', () => {
    render(<Header />);
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it('toggles theme and sets cookie on click', () => {
    render(<Header />);
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });

    expect(document.documentElement.dataset.theme).toBe('light');

    fireEvent.click(toggleBtn);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.cookie.includes('theme=dark')).toBe(true);

    fireEvent.click(toggleBtn);
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.cookie.includes('theme=light')).toBe(true);
  });
});
