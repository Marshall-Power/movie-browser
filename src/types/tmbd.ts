export interface TMDBMovie {
  id: number;
  title: string;
  imageUrl: string;
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBCategoryData {
  name: string;
  movies: TMDBMovie[];
}


export type HomeInitialData = TMDBCategoryData[];
