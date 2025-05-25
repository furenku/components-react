"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Carousel, CarouselContent, CarouselItem, } from '../../ui/carousel';
export const ImageCarousel = ({ images, orientation = "horizontal" }) => {
    const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));
    const fade = useRef(Fade({}));
    const carouselRef = useRef(null);
    // This effect adds height:100% to all parent elements of the carousel
    useEffect(() => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            // Add a class to the carousel and target it with CSS
            container.classList.add('full-height-carousel');
            // Add inline style to the overflow-hidden div
            const overflowDiv = container.querySelector('div.overflow-hidden');
            if (overflowDiv) {
                overflowDiv.style.height = '100%';
            }
        }
    }, []);
    return (_jsx(Carousel, { ref: carouselRef, orientation: orientation, plugins: [
            autoplay.current,
            fade.current
        ], opts: {
            loop: true,
            align: 'center',
            containScroll: 'trimSnaps',
        }, className: "w-full h-full full-height-carousel", children: _jsx(CarouselContent, { className: "-ml-1 h-full", children: images.map((image, index) => (_jsx(CarouselItem, { className: "pl-1 basis-full h-full", children: _jsx("div", { className: "relative w-full h-full", children: _jsx(ImageContainer, { src: image.src, alt: `Image ${index + 1}`, className: "object-cover", blurDataURL: image.preview, sizes: image.sizes, priority: index === 0 }) }) }, index))) }) }));
};
export default ImageCarousel;
//# sourceMappingURL=ImageCarouse.js.map