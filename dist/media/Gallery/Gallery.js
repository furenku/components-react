"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import useMeasure from "react-use-measure";
import { ImageContainer } from '../ImageContainer/ImageContainer';
// Tailwind breakpoints (adjust if your config differs)
const BREAKPOINTS = {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
};
const getVisibleThumbCount = (width) => {
    if (width >= BREAKPOINTS.xl) {
        return 6;
    }
    else if (width >= BREAKPOINTS.lg) {
        return 4;
    }
    else if (width >= BREAKPOINTS.md) {
        return 3;
    }
    return 2;
};
const getBreakpoint = (width) => {
    let bp = 'xs';
    Object.entries(BREAKPOINTS).forEach(([key, value]) => {
        if (width >= value) {
            bp = key;
        }
    });
    return bp;
};
const pickImageSize = (img, bp) => {
    if (!img.sizes || !img.sizes[bp])
        return;
    return img.sizes[bp];
};
export const Gallery = ({ images, className = '', }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [actualImages, setActualImages] = useState([]);
    const [visibleThumbCount, setVisibleThumbCount] = useState(2); // Default count
    const [mainImageRef, bounds] = useMeasure();
    const width = bounds.width;
    let mainBreakpoint = undefined;
    if (width) {
        mainBreakpoint = getBreakpoint(width * 1.25);
    }
    // Effect to update visible thumb count on resize
    useEffect(() => {
        const handleResize = () => {
            setVisibleThumbCount(getVisibleThumbCount(window.innerWidth));
        };
        // Set initial count
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures this runs only on mount and cleanup
    const openLightbox = (index) => {
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
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (lightboxOpen) {
                if (event.key === 'ArrowRight') {
                    nextImage();
                }
                else if (event.key === 'ArrowLeft') {
                    prevImage();
                }
                else if (event.key === 'Escape') {
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
        }
        else {
            setActualImages([]);
        }
    }, [images]);
    const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 0));
    useEffect(() => {
        const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
        handleResize(); // Set initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    if (!images || images.length === 0)
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("p", { className: "text-gray-500", children: "No images available" }) }));
    // Slice the thumbnails based on the calculated visible count for rendering
    const visibleThumbs = actualImages.slice(1, visibleThumbCount + 1);
    const main = actualImages[0];
    return (_jsxs("div", { className: `w-full h-full ${className}`, children: [_jsxs("div", { className: "flex flex-col md:flex-row h-full", children: [main && (_jsx("div", { className: "main-image xs:w-full grow-[7] md:grow-[3] xl:flex-1 md:h-full cursor-pointer", onClick: () => openLightbox(0), ref: mainImageRef, children: mainBreakpoint ? (_jsx(ImageContainer, { src: pickImageSize(main, mainBreakpoint)?.src || '', alt: main.alt ?? 'Main image', blurDataURL: main.preview || "", width: main.width, height: main.height })) : (_jsx("div", { className: "w-full h-full bg-gray-200 animate-pulse" })) })), visibleThumbs.length > 0 && (
                    // Note: The grid classes define layout structure, not the number of items.
                    // This will show *up to* 2, 4, or 6 items within the defined grid.
                    // The layout might look sparse on larger screens if few images are provided.
                    _jsx("div", { className: "flex grow-[3] md:grow-[2] xl:flex-1 md:grid md:grid-cols-1 md:grid-rows-3 lg:grid-rows-2 xl:grid-cols-2  overflow-hidden", children: visibleThumbs.map((img, i) => (
                        // Calculate the correct original index for the lightbox
                        // The index `i` is relative to `visibleThumbs`, but we need the index within the full `images` array
                        _jsx("div", { className: "flex-1 h-full cursor-pointer", onClick: () => openLightbox(i + 1), children: _jsx(ImageContainer, { src: pickImageSize(img, 'xs')?.src || "", alt: img.alt ?? `Thumbnail ${i + 1}`, blurDataURL: img.preview || "", width: img.width, height: img.height }) }, i))) }))] }), lightboxOpen && (_jsxs("div", { className: "fixed inset-0 bg-black bg-opacity-90 flex flex-col gap-4 items-center justify-center z-50", children: [_jsx("button", { "aria-label": "Close lightbox", className: "absolute top-4 right-4 text-white text-2xl z-10", onClick: closeLightbox, children: "\u2715" }), _jsx("button", { "aria-label": "Previous image", className: "absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10", onClick: prevImage, children: "\u276E" }), _jsx("button", { "aria-label": "Next image", className: "absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl z-10", onClick: nextImage, children: "\u276F" }), _jsx("div", { className: "relative flex justify-center items-center w-[calc(100%-8rem)] h-[calc(100%-8rem)]", children: _jsx(ImageContainer, { src: pickImageSize(images[currentIndex], breakpoint)?.src || "", alt: images[currentIndex].alt ?? 'Image', blurDataURL: images[currentIndex].preview || "", objectFit: 'contain', width: images[currentIndex].width, height: images[currentIndex].height }) }), _jsxs("footer", { className: "w-full h-12 flex flex-col items-center justify-center gap-2 absolute bottom-2", children: [(images[currentIndex].caption || images[currentIndex].alt) && (_jsx("div", { className: "text-sm text-gray-200 px-4 text-center truncate", children: images[currentIndex].caption || images[currentIndex].alt })), _jsx("div", { className: "pagination flex items-center justify-center gap-1.5", children: images.map((_, index) => (_jsx("button", { "aria-label": `Go to image ${index + 1}`, className: `w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-600'} transition-colors duration-200 hover:bg-gray-400`, onClick: () => setCurrentIndex(index) }, index))) })] })] }))] }));
};
//# sourceMappingURL=Gallery.js.map