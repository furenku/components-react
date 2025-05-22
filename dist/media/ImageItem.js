"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ImageContainer } from '@/components/ImageContainer';
import { useDrag } from 'react-dnd';
export const ImageItem = ({ image, isSelected, onClick, viewMode, onActualDragStart, onActualDragEnd, selectedImageIds, isGloballyDragging, }) => {
    const [{ isDragging: isDragSource }, drag] = useDrag(() => ({
        type: 'IMAGE_COLLECTION',
        item: () => {
            const imageIdStr = image.id.toString();
            // If the current image is selected, drag all selected images.
            // Otherwise, drag only the current image.
            const idsToDrag = selectedImageIds.has(imageIdStr) && selectedImageIds.size > 0
                ? Array.from(selectedImageIds)
                : [imageIdStr];
            onActualDragStart(idsToDrag);
            return {
                imageIds: idsToDrag,
                representativeImageSrc: image.sizes.sm?.src || image.src,
                type: 'IMAGE_COLLECTION'
            };
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: () => {
            onActualDragEnd();
        },
    }), [image, selectedImageIds, onActualDragStart, onActualDragEnd]);
    // An item is effectively being dragged if it's the source or if it's selected and a global drag is in progress.
    const isEffectivelyDragging = isDragSource || (isGloballyDragging && isSelected);
    return (_jsxs("div", { ref: drag, className: `
        ${viewMode === 'grid' ? 'w-40 h-40 m-2' : 'w-full h-20 my-1 flex items-center'}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isEffectivelyDragging ? 'opacity-50' : 'opacity-100'}
        cursor-pointer relative overflow-hidden rounded-md shadow-sm transition-all
      `, onClick: (e) => onClick(e, image), style: { zIndex: isDragSource ? 50 : 'auto' }, children: [_jsx("div", { className: `relative ${viewMode === 'grid' ? 'h-32' : 'h-full w-24 mr-4'}`, children: _jsx(ImageContainer, { src: image.sizes.sm?.src || image.src, alt: image.alt || image.filename, blurDataURL: image.preview || '' }) }), viewMode === 'list' && (_jsxs("div", { className: "flex-1 truncate", children: [_jsx("p", { className: "font-medium truncate", children: image.filename }), _jsx("p", { className: "text-sm text-gray-500 truncate", children: image.path || 'No folder' })] })), viewMode === 'grid' && (_jsx("p", { className: "text-xs truncate p-1 text-center bg-white bg-opacity-70", children: image.filename }))] }));
};
//# sourceMappingURL=ImageItem.js.map