import React from 'react';
interface FolderDisplayItemProps {
    name: string;
    path: string;
    isActive: boolean;
    onClick: () => void;
    onDrop: (imageIds: string[]) => void;
    onContextMenuOpen: (event: React.MouseEvent, folderPath: string, folderName: string) => void;
    selectedItemCount: number;
    highlight?: boolean;
}
export declare const FolderDisplayItem: React.FC<FolderDisplayItemProps>;
export {};
//# sourceMappingURL=FolderDisplayItem.d.ts.map