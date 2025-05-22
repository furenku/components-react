"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ImageItem } from './ImageItem';
export const ImageGallery = ({ images, selectedImageIds, viewMode, onImageClick, onImageDragStart, onImageDragEnd, isGloballyDragging, }) => {
    return (_jsxs("div", { className: "mt-4", children: [_jsxs("h3", { className: "text-lg font-medium mb-2", children: ["Images ", images.length > 0 && `(${images.length})`] }), _jsx("div", { className: viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2'
                    : 'flex flex-col', children: images.length === 0 ? (_jsx("div", { className: "col-span-full text-center py-8 text-gray-500", children: "No images in this folder." })) : (images.map(image => (_jsx(ImageItem, { image: image, isSelected: selectedImageIds.has(image.id.toString()), onClick: onImageClick, viewMode: viewMode, onActualDragStart: onImageDragStart, onActualDragEnd: onImageDragEnd, selectedImageIds: selectedImageIds, isGloballyDragging: isGloballyDragging }, image.id)))) })] }));
};
//# sourceMappingURL=ImageGallery.js.map