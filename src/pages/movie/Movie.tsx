import { useParams } from 'react-router-dom';

export function Movie() {
  const { id } = useParams();
  return <h1>Movie {id}</h1>;
}
