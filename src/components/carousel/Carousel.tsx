import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, Button } from '../../components';

export function Carousel({ title, items }: any) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });

  // useEffect(() => {
  //   if (emblaApi) {
  //     console.log(emblaApi.slideNodes()); // Access API
  //   }
  // }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <h2 className="embla__title">{title}</h2>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {items.map(({ id, title, imageUrl }: any) => (
            <div key={id} className="embla__slide">
              <Card id={id} title={title} imageUrl={imageUrl} href={`movie/${id}`} />
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
}
