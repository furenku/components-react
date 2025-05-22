import React from 'react';
import { ApiImage } from '@/types/media-server';
import { ViewMode } from '@/types/mediaGalleryTypes';
interface ImageGalleryProps {
    images: ApiImage[];
    selectedImageIds: Set<string>;
    viewMode: ViewMode;
    onImageClick: (e: React.MouseEvent, image: ApiImage) => void;
    onImageDragStart: (draggedIds: string[]) => void;
    onImageDragEnd: () => void;
    isGloballyDragging: boolean;
}
export declare const ImageGallery: React.FC<ImageGalleryProps>;
export {};
//# sourceMappingURL=ImageGallery.d.ts.map