"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FolderDisplayItem } from './FolderDisplayItem';
export const FolderBrowser = ({ subFolders, currentPath, onFolderClick, onNavigateUp, onDropItemToFolder, onContextMenuOpen, selectedItemCount, }) => {
    return (_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Folders" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2", children: [currentPath && (_jsx(FolderDisplayItem, { name: "..", path: currentPath
                            .split('/')
                            .filter(Boolean)
                            .slice(0, -1)
                            .join('/'), isActive: false, onClick: onNavigateUp, onDrop: (droppedImageIds) => onDropItemToFolder(droppedImageIds, currentPath
                            .split('/')
                            .filter(Boolean)
                            .slice(0, -1)
                            .join('/')), onContextMenuOpen: onContextMenuOpen, selectedItemCount: selectedItemCount }, "..")), subFolders.map(folderName => {
                        const folderPath = currentPath ? `${currentPath}/${folderName}` : folderName;
                        return (_jsx(FolderDisplayItem, { name: folderName, path: folderPath, isActive: false, onClick: () => onFolderClick(folderName), onDrop: (droppedImageIds) => onDropItemToFolder(droppedImageIds, folderPath), onContextMenuOpen: onContextMenuOpen, selectedItemCount: selectedItemCount }, folderPath));
                    })] })] }));
};
//# sourceMappingURL=FolderBrowser.js.map