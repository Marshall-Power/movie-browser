import { Header } from '../../components';
import { MovieDetails } from '../../types';

export function MoviePage({...movie}: MovieDetails) {
  console.log(movie);

  return (
    <>
      <Header />
    </>
  );
}
