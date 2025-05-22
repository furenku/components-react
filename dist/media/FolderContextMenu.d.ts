import React from 'react';
interface FolderContextMenuProps {
    x: number;
    y: number;
    folderName: string;
    folderPath: string;
    itemCount: number;
    onMoveSelectedItems: () => void;
    onRenameFolder: (folderPath: string) => void;
}
export declare const FolderContextMenu: React.FC<FolderContextMenuProps>;
export {};
//# sourceMappingURL=FolderContextMenu.d.ts.map