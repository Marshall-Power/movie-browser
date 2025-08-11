import { JSX } from 'react';
import { Header } from '../../components';

export const Home = ({ initialData }: any): JSX.Element => {
  console.log(initialData)
  return (
    <div className="home">
        <Header />
      <div className="home__content"></div>
    </div>
  );
}
