import { useState, useRef, useLayoutEffect, RefObject } from 'react';

export const useContainerWidth = <T extends HTMLElement>(): [RefObject<T | null>, number] => {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      setWidth(ref.current!.offsetWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, width];
}
