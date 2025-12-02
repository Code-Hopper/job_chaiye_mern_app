import React from "react";

const EditorToolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="flex gap-2 p-2 border rounded mb-3 bg-gray-100">

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
            >
                Bold
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                Italic
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
                Strike
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                P
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                H1
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                H2
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                • List
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                1. List
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().undo().run()}
            >
                Undo
            </button>

            <button
                className="px-3 py-1 border rounded"
                onClick={() => editor.chain().focus().redo().run()}
            >
                Redo
            </button>

        </div>
    );
};

export default EditorToolbar;
