import { Route, Routes } from 'react-router-dom';
import { Home, Movie } from '../pages';

export const Router = ({ initialData }: any) => {
  return (
    <Routes>
      <Route index path="/" element={<Home initialData={initialData} />} />
      <Route path="movie/:id" element={<Movie />} />
    </Routes>
  );
};
