"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
// Reusable component for animated image loading with blur placeholder
export const ImageContainer = ({ src, alt, width, height, blurDataURL, objectFit = 'cover', className = '', priority = false, // Add priority prop
 }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const dimensions = {};
    // Use width/height for 'contain', otherwise use 'fill'
    if (objectFit === 'contain' && width && height) {
        dimensions.width = width;
        dimensions.height = height;
    }
    else {
        dimensions.fill = true;
    }
    return (_jsx("div", { className: `relative w-full h-full overflow-hidden ${className}`, children: _jsx(motion.div, { className: `relative w-full h-full flex items-center justify-center overflow-hidden ${className}`, initial: { opacity: 0.6 }, animate: { opacity: isLoaded ? 1 : 0.6 }, transition: { duration: 0.4 }, children: _jsx(Image, { src: src, alt: alt, loading: priority ? undefined : "lazy", priority: priority, placeholder: blurDataURL ? 'blur' : 'empty', blurDataURL: blurDataURL, onLoadingComplete: () => setIsLoaded(true), style: { objectFit }, ...dimensions }) }) }));
};
//# sourceMappingURL=ImageContainer.js.map