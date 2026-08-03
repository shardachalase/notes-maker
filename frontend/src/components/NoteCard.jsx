import React from 'react';
import { FiTrash2, FiPaperclip } from 'react-icons/fi';
import './NoteCard.css';

const NoteCard = ({ note, onClick, onDelete }) => {

    const date = new Date(note.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
    });

    return (
        <div className="note-card" onClick={() => onClick(note)}>
            {note.attachments && note.attachments.length > 0 && (
                <div className="card-attachment-indicator">
                    <FiPaperclip />
                    <span>{note.attachments.length}</span>
                </div>
            )}
            <div className="note-card-header">
                <span className="note-date">{date}</span>
                <button className="icon-btn delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}>
                    <FiTrash2 />
                </button>
            </div>

            <h3 className="note-title">{note.title || "Untitled Note"}</h3>

            <p className="note-preview">
                {note.content?.substring(0, 100)}
                {note.content?.length > 100 ? "..." : ""}
            </p>

            {note.tags && note.tags.length > 0 && (
                <div className="note-tags">
                    {note.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NoteCard;
