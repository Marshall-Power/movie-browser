import { JSX } from 'react';
import { Header, Carousel } from '../../components';

export const Home = ({ initialData }: any): JSX.Element => {
  return (
    <div className="home">
      <Header />
      <div className="home__content">
        {initialData.map((element: any) => {
          return <Carousel key={element.name} title={element.name} items={element.movies} />;
        })}
      </div>
    </div>
  );
};
