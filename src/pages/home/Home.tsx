import { Header, Carousel } from '../../components';
import { HomeInitialData } from '../../types';

interface HomePageProps {
  initialData: HomeInitialData;
}

export const Home = ({ initialData }: HomePageProps) => {
  return (
    <div className="home">
      <Header />
      <div className="home__content">
        {initialData.map((element: any) => {
          return <Carousel key={element.name} name={element.name} items={element.movies} />;
        })}
      </div>
    </div>
  );
};
