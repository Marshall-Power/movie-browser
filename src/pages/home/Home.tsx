import { Header, Carousel, Card } from '../../components';
import { HomeInitialData, TMDBCategoryData, TMDBMovie } from '../../types';

interface HomePageProps {
  initialData: HomeInitialData;
}

export const Home = ({ initialData }: HomePageProps) => {
  return (
    <div className="home">
      <Header />
      <div className="home__content">
        {initialData.map(({ name, movies }: TMDBCategoryData) => {
          return (
            <Carousel
              key={name}
              name={name}
              items={movies}
              getKey={(m) => m.id}
              renderItem={({ id, title, imageUrl }: TMDBMovie) => (
                <Card id={id} title={title} imageUrl={imageUrl} href={`/movie/${id}`} />
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
