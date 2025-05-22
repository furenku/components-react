import React from 'react';
interface FolderBrowserProps {
    subFolders: string[];
    currentPath: string;
    onFolderClick: (folderName: string) => void;
    onNavigateUp: () => void;
    onDropItemToFolder: (imageIds: string[], targetPath: string) => void;
    onContextMenuOpen: (event: React.MouseEvent, folderPath: string, folderName: string) => void;
    selectedItemCount: number;
}
export declare const FolderBrowser: React.FC<FolderBrowserProps>;
export {};
//# sourceMappingURL=FolderBrowser.d.ts.map