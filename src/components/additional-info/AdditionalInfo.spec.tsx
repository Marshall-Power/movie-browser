import { render, screen } from '@testing-library/react';
import { AdditionalInfo } from './AdditionalInfo';

test('renders movie additional info', () => {
  render(
    <AdditionalInfo
      info={{
        popularity: 123.56,
        runtime: 137,
        budget: 1000,
        revenue: 2500000.5,
        spoken_languages: [
          { iso_639_1: 'en', name: 'English', english_name: 'English' },
          { iso_639_1: 'es', name: 'Español', english_name: 'Spanish' },
        ],
      }}
    />
  );

  expect(screen.getByText('124')).toBeInTheDocument();
  expect(screen.getByText(/137 min/)).toBeInTheDocument();
  expect(screen.getByText(/\$1,000\.00/)).toBeInTheDocument();
  expect(screen.getByText(/\$2,500,000\.50/)).toBeInTheDocument();
  expect(screen.getByText('English, Spanish')).toBeInTheDocument();
});

