import { useParams } from 'react-router-dom';
import { Header } from '../../components';

export function Movie() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <h1>Movie {id}</h1>
    </>
  );
}
