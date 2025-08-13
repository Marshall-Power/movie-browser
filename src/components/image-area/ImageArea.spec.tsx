import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ImageArea } from './ImageArea';

describe('ImageArea', () => {
  const title = 'Blade Runner';

  it('renders the landscape image with backdrop when available', () => {
    render(<ImageArea title={title} backdropPath="/backdrop.jpg" size="w780" />);

    const img = screen.getByRole('img', { name: `Poster of ${title}` });
    expect(img).toBeInTheDocument();

    
    const src = img.getAttribute('src')!;
    expect(src).toContain('/w780');
    expect(src).toContain('/backdrop.jpg');

    
    expect(img).toHaveAttribute('width', '780');
    expect(img).toHaveAttribute('height', '439');

   
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('decoding', 'sync');
  });

  it('falls back to posterPath when backdrop is not provided', () => {
    render(<ImageArea title={title} posterPath="/poster.jpg" size="w780" />);

    const img = screen.getByRole('img', { name: `Poster of ${title}` });
    const src = img.getAttribute('src')!;
    expect(src).toContain('/w780');
    expect(src).toContain('/poster.jpg');
  });

  it('renders a placeholder when neither backdrop nor poster is available', () => {
    render(<ImageArea title={title} />);

    
    const placeholder = screen.getByLabelText(`No poster available for ${title}`);
    expect(placeholder).toBeInTheDocument();

   
    expect(screen.queryByRole('img', { name: `Poster of ${title}` })).not.toBeInTheDocument();
  });
});
