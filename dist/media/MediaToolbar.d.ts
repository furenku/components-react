import React from 'react';
import { ViewMode } from '@/types/mediaGalleryTypes';
interface MediaToolbarProps {
    currentPath: string;
    onNavigateUp: () => void;
    viewMode: ViewMode;
    onSetViewMode: (mode: ViewMode) => void;
    onShowCreateFolderModal: () => void;
}
export declare const MediaToolbar: React.FC<MediaToolbarProps>;
export {};
//# sourceMappingURL=MediaToolbar.d.ts.map