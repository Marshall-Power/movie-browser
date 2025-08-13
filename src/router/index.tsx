import { Route, Routes } from 'react-router-dom';
import { Home, MoviePage } from '../pages';
import { HomeInitialData } from '../types';

interface RouterProps {
  initialData: HomeInitialData;
}

export const Router = ({ initialData }: RouterProps) => {
  return (
    <Routes>
      <Route index path="/" element={<Home initialData={initialData} />} />
      <Route path="movie/:id" element={<MoviePage />} />
    </Routes>
  );
};
