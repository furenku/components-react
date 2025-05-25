"use client"

import React, { useEffect, useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../../components/ui/carousel';
import { ApiImage } from '../../types/media';
import { ImageContainer } from '../ImageContainer/ImageContainer';



interface Props {
  images: ApiImage[];
  orientation?: "vertical" | "horizontal";
}

export const ImageCarousel: React.FC<Props> = ({ 
  images, 
  orientation = "horizontal" 
}) => {
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );
  const fade = useRef(
    Fade({ })
  );
  
  const carouselRef = useRef<HTMLDivElement>(null);

  // This effect adds height:100% to all parent elements of the carousel
  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      // Add a class to the carousel and target it with CSS
      container.classList.add('full-height-carousel');
      
      // Add inline style to the overflow-hidden div
      const overflowDiv = container.querySelector('div.overflow-hidden');
      if (overflowDiv) {
        (overflowDiv as HTMLElement).style.height = '100%';
      }
    }
  }, []);

  return (
    <Carousel 
      ref={carouselRef}
      orientation={orientation}
      plugins={[
        autoplay.current,
        fade.current
      ]}
      opts={{
        loop: true,
        align: 'center',
        containScroll: 'trimSnaps',
      }}
      className="w-full h-full full-height-carousel"
    >
      <CarouselContent className="-ml-1 h-full">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 basis-full h-full">
            <div className="relative w-full h-full">
              <ImageContainer
                src={image.src} 
                alt={`Image ${index + 1}`} 
                className="object-cover" 
                blurDataURL={image.preview}
                // sizes={image.sizes}
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImageCarousel;