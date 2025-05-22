"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
export const RenameFolderModal = ({ isOpen, onClose, onRenameFolder, folderPath, }) => {
    const currentFolderName = folderPath.split('/').pop() || '';
    const [newFolderName, setNewFolderName] = useState(currentFolderName);
    const [error, setError] = useState('');
    useEffect(() => {
        if (isOpen) {
            setNewFolderName(currentFolderName);
            setError('');
        }
    }, [isOpen, currentFolderName]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) {
            setError('Folder name cannot be empty');
            return;
        }
        if (newFolderName === currentFolderName) {
            onClose();
            return;
        }
        onRenameFolder(newFolderName);
    };
    return (_jsx(Dialog.Root, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsxs(Dialog.Portal, { children: [_jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black opacity-30" }), _jsxs(Dialog.Content, { className: "fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md mx-auto", children: [_jsx(Dialog.Title, { className: "text-xl font-medium mb-4", children: "Rename Folder" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Folder Name" }), _jsx("input", { type: "text", value: newFolderName, onChange: (e) => setNewFolderName(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500", autoFocus: true }), error && _jsx("p", { className: "text-red-500 text-sm mt-1", children: error })] }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx(Dialog.Close, { asChild: true, children: _jsx("button", { type: "button", className: "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200", children: "Cancel" }) }), _jsx("button", { type: "submit", className: "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700", children: "Rename" })] })] })] })] }) }));
};
//# sourceMappingURL=RenameFolderModal.js.map