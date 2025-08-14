import { RefObject } from 'react';
import { useContainerWidth } from './useContainerWidth';

export const useTMDBImageSize = <T extends HTMLElement>(): [
  RefObject<T | null>,
  'w342' | 'w500' | 'w780' | 'w1280' | 'original'
] => {
  const [ref, width] = useContainerWidth<T>();

  const size: 'w342' | 'w500' | 'w780' | 'w1280' | 'original' =
    width >= 1500 ? 'original' :
      width >= 1200 ? 'w1280' :
        width >= 780 ? 'w780' :
          width >= 500 ? 'w500' :
            'w342';

  return [ref, size];
}
