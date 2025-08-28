"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useMeasure from "react-use-measure";
import { ApiImage, Breakpoint } from '../../types/media';
import { ImageContainer } from '../ImageContainer/ImageContainer';
import { pickImageSize } from '../utils';

interface GalleryProps {
  images: ApiImage[];
  className?: string;
  gap?: number;
}

// Tailwind breakpoints (adjust if your config differs)
const BREAKPOINTS = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const getVisibleThumbCount = (width: number): number => {
  if (width >= BREAKPOINTS.xl) {
    return 6;
  } else if (width >= BREAKPOINTS.lg) {
    return 4;
  } else if (width >= BREAKPOINTS.md) {
    return 3;
  }
  return 2;
};

const getBreakpoint = (width: number): Breakpoint => {
  let bp: Breakpoint = 'xs';
  Object.entries(BREAKPOINTS).forEach(([key, value]) => {
    if (width >= value) {
      bp = key as Breakpoint;
    }
  });
  return bp;
};

export const Gallery: React.FC<GalleryProps> = ({
  images,
  className = '',
  gap
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actualImages, setActualImages] = useState<ApiImage[]>([]);

  const [containerRef, containerBounds] = useMeasure();
  const [mainImageRef, mainImageBounds] = useMeasure();

  const containerWidth = containerBounds.width;
  const mainImageWidth = mainImageBounds.width;

  

  // Calculate breakpoints and visible thumb count based on container size
  const breakpoint = containerWidth ? getBreakpoint(containerWidth) : 'xs';
  const visibleThumbCount = containerWidth ? getVisibleThumbCount(containerWidth) : 2;
  
  let mainBreakpoint: Breakpoint | undefined = undefined;
  if (mainImageWidth) {
    mainBreakpoint = getBreakpoint(mainImageWidth * 1.25);
  }

  if (!Array.isArray(images)) {
    return <>No Images</>;
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);


  const getLightboxBreakpoint = (image: ApiImage): Breakpoint => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Use 80% of viewport for significant padding
    const maxWidth = viewportWidth * 0.8;
    const maxHeight = viewportHeight * 0.8;
    
    // Calculate the scale needed to fit the image within viewport bounds
    const scaleX = maxWidth / image.width;
    const scaleY = maxHeight / image.height;
    const scale = Math.min(scaleX, scaleY, 1); // Don't upscale
    
    // Calculate the actual display size
    const displayWidth = image.width * scale;
    
    // Return breakpoint based on display width
    return getBreakpoint(displayWidth);
  };


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxOpen) {
        if (event.key === 'ArrowRight') {
          nextImage();
        } else if (event.key === 'ArrowLeft') {
          prevImage();
        } else if (event.key === 'Escape') {
          closeLightbox();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, nextImage, prevImage]);

  useEffect(() => {
    // Store all potential thumbnails (excluding the main image)
    if (images.length > 0) {
      setActualImages(images);
    } else {
      setActualImages([]);
    }
  }, [images]);

  if (!images || images.length === 0) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">No images available</p>
    </div>
  );

  // Slice the thumbnails based on the calculated visible count for rendering
  const visibleThumbs = actualImages.slice(1, visibleThumbCount + 1);
  const main = actualImages[0];

  return (
    <div className={`Gallery flex w-full h-full ${className}`} ref={containerRef} style={{
      padding: gap ? `${gap*4}px` : '0px',
    }}>
      <div className={`w-full h-full flex flex-col md:flex-row`} style={{
        gap: gap ? `${gap*4}px` : '0px',
      }}>
        {/* Main Image */}
        {main && (
          <div 
            className="main-image xs:w-full grow-[7] md:grow-[3] xl:flex-1 md:h-full cursor-pointer" 
            onClick={() => openLightbox(0)}
            ref={mainImageRef}
          >
            {mainBreakpoint ? (
              <ImageContainer
                src={pickImageSize(main, mainBreakpoint)?.src || ''}
                alt={main.alt ?? 'Main image'}
                blurDataURL={main.preview || ""}
                width={main.width}
                height={main.height}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}
          </div>
        )}

        {/* Thumbnails */}
        {visibleThumbs.length > 0 && (
          <div className={`flex grow-[3] md:grow-[2] xl:flex-1 md:grid md:grid-cols-1 md:grid-rows-3 lg:grid-rows-2 lg:grid-cols-2 xl:grid-cols-3 overflow-hidden`} style={{
            gap: gap ? `${gap*4}px` : '0px',
          }}>
            {visibleThumbs.map((img, i) => (
              <div className="flex-1 h-full cursor-pointer" key={i} onClick={() => openLightbox(i + 1)}>
                <ImageContainer
                  src={pickImageSize(img, 'xs')?.src || ""}
                  alt={img.alt ?? `Thumbnail ${i + 1}`}
                  blurDataURL={img.preview || ""}
                  width={img.width}
                  height={img.height}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col gap-4 items-center justify-center z-50">
          <button aria-label="Close lightbox" className="absolute top-4 right-4 text-white text-2xl z-10" onClick={closeLightbox}>✕</button>
          <button aria-label="Previous image" className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10" onClick={prevImage}>❮</button>
          <button aria-label="Next image" className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10" onClick={nextImage}>❯</button>
          <div className="relative flex justify-center items-center w-[80vw] h-[80vh] max-w-[80vw] max-h-[80vh]">
            <ImageContainer
              src={pickImageSize(images[currentIndex], getLightboxBreakpoint(images[currentIndex]))?.src || ""}
              alt={images[currentIndex].alt ?? 'Image'}
              blurDataURL={images[currentIndex].preview || ""}
              objectFit='contain'
              width={images[currentIndex].width}
              height={images[currentIndex].height}
            />
          </div>

          <footer className="w-full h-12 flex flex-col items-center justify-center gap-2 absolute bottom-2">
            {/* Caption */}
            {(images[currentIndex].caption || images[currentIndex].alt) && (
              <div className="text-sm text-gray-200 px-4 text-center truncate">
                {images[currentIndex].caption || images[currentIndex].alt}
              </div>
            )}
            {/* Pagination Dots */}
            <div className="pagination flex items-center justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to image ${index + 1}`}
                  className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-600'} transition-colors duration-200 hover:bg-gray-400`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};