import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '../../components';

type CarouselProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => React.Key;
  renderItem: (item: T, index: number) => React.ReactNode;
  name?: string;
  className?: string;
};

export const Carousel = <T,>({
  name,
  items,
  getKey,
  renderItem,
  className = '',
}: CarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={`embla ${className}`}>
      <h2 className="embla__title">{name}</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, i) => (
            <div key={getKey(item, i)} className="embla__slide">
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__navigation">
        <Button
          className="embla__navigation-button embla__navigation-button--prev"
          onClick={scrollPrev}
        >
          Prev
        </Button>
        <Button
          className="embla__navigation-button embla__navigation-button--next"
          onClick={scrollNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
