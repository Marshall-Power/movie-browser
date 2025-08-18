import { MovieDetails } from '../../types';

type AdditionalInfoProps = {
  info: Pick<MovieDetails, 'popularity' | 'runtime' | 'budget' | 'revenue' | 'spoken_languages'>;
};

export const AdditionalInfo = ({ info }: AdditionalInfoProps) => {
  const { popularity, runtime, budget, revenue, spoken_languages } = info;
  const numberFormat = (amount: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="additional-info">
      <div className="additional-info__row">
        <span className="additional-info__label">Popularity:</span>
        <span className="additional-info__value">{Math.round(popularity)}</span>
      </div>

      <div className="additional-info__row">
        <span className="additional-info__label">Runtime:</span>
        <span className="additional-info__value">{runtime} min</span>
      </div>

      <div className="additional-info__row">
        <span className="additional-info__label">Budget:</span>
        <span className="additional-info__value">{numberFormat(budget)}</span>
      </div>

      <div className="additional-info__row">
        <span className="additional-info__label">Revenue:</span>
        <span className="additional-info__value">{numberFormat(revenue)}</span>
      </div>

      <div className="additional-info__row">
        <span className="additional-info__label">Languages:</span>
        <span className="additional-info__value">
          {spoken_languages.map((lang) => lang.english_name).join(', ')}
        </span>
      </div>
    </div>
  );
};
