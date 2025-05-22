"use client";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const FolderContextMenu = ({ x, y, folderName, folderPath, itemCount, onMoveSelectedItems, onRenameFolder, }) => {
    console.log("Rendering FolderContextMenu:", { x, y, folderName, folderPath, itemCount });
    return (_jsxs("div", { style: { top: y, left: x, position: 'fixed', zIndex: 150 }, className: "bg-white shadow-lg rounded-md py-1 border border-gray-200 min-w-[200px]", onClick: (e) => e.stopPropagation(), children: [_jsxs("button", { onClick: () => onRenameFolder(folderPath), className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", children: ["Rename \"", folderName, "\""] }), itemCount > 0 && (_jsxs("button", { onClick: onMoveSelectedItems, className: "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900", children: ["Move ", itemCount, " item(s) to \"", folderName, "\""] }))] }));
};
//# sourceMappingURL=FolderContextMenu.js.map