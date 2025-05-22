"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const CreateFolderModal = ({ isOpen, onClose, onCreateFolder, currentPath, }) => {
    const [folderName, setFolderName] = useState('');
    if (!isOpen)
        return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (folderName.trim()) {
            const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
            onCreateFolder(newPath);
            setFolderName('');
            onClose();
        }
    };
    return (_jsx("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-xl w-96", children: [_jsx("h3", { className: "text-lg font-medium mb-4", children: "Create New Folder" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Folder Name" }), _jsx("input", { type: "text", value: folderName, onChange: (e) => setFolderName(e.target.value), className: "w-full p-2 border border-gray-300 rounded-md", placeholder: "Enter folder name", autoFocus: true }), currentPath && (_jsxs("p", { className: "text-sm text-gray-500 mt-1", children: ["Will be created in: ", currentPath] }))] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { type: "button", onClick: onClose, className: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-600", children: "Create" })] })] })] }) }));
};
//# sourceMappingURL=CreateFolderModal.js.map