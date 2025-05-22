import React from 'react';
import { ApiImage } from '@/types/media-server';
import { ViewMode } from '@/types/mediaGalleryTypes';
interface ImageItemProps {
    image: ApiImage;
    isSelected: boolean;
    onClick: (e: React.MouseEvent, image: ApiImage) => void;
    viewMode: ViewMode;
    onActualDragStart: (draggedIds: string[]) => void;
    onActualDragEnd: () => void;
    selectedImageIds: Set<string>;
    isGloballyDragging: boolean;
}
export declare const ImageItem: React.FC<ImageItemProps>;
export {};
//# sourceMappingURL=ImageItem.d.ts.map