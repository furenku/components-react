"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FolderIcon } from '@heroicons/react/24/outline';
import { useDrop } from 'react-dnd';
export const FolderDisplayItem = ({ name, path, isActive, onClick, onDrop, onContextMenuOpen, selectedItemCount, highlight, }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'IMAGE_COLLECTION',
        drop: (item) => {
            onDrop(item.imageIds);
            return { name };
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [onDrop, name, path]);
    const handleContextMenu = (event) => {
        event.preventDefault();
        console.log("Context menu triggered for:", { name, path });
        onContextMenuOpen(event, path, name);
    };
    return (_jsxs("div", { ref: drop, className: `
        flex items-center p-2 my-1 rounded-md cursor-pointer transition
        ${isActive ? 'bg-blue-100' : 'hover:bg-gray-100'}
        ${isOver && canDrop ? 'bg-blue-200 ring-2 ring-blue-500' : ''}
        ${highlight ? 'bg-blue-200' : ''}
        border border-dashed ${isOver && canDrop ? 'border-blue-500' : 'border-transparent'}
      `, onClick: onClick, onContextMenu: handleContextMenu, style: { fontWeight: isActive ? 700 : 400 }, children: [_jsx(FolderIcon, { className: "w-5 h-5 mr-2 text-blue-500" }), _jsx("span", { className: "truncate", children: name })] }));
};
//# sourceMappingURL=FolderDisplayItem.js.map