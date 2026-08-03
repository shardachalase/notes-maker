import React, { useState, useEffect, useContext, useRef } from 'react';
import { FiX, FiCheck, FiPaperclip, FiFile } from 'react-icons/fi';
import { NoteContext } from '../context/NoteContext';
import './NoteEditor.css';

const NoteEditor = ({ note, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    
    const { uploadFile } = useContext(NoteContext);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (note) {
            setTitle(note.title || '');
            setContent(note.content || '');
            setTags(note.tags || []);
            setAttachments(note.attachments || []);
        } else {
            setTitle('');
            setContent('');
            setTags([]);
            setAttachments([]);
        }
    }, [note]);

    const handleSave = () => {
        if (!title.trim() && !content.trim()) return;
        
        onSave({
            ...note,
            title,
            content,
            tags,
            attachments
        });
        onClose();
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedFile = await uploadFile(file);
            setAttachments([...attachments, uploadedFile]);
        } catch (error) {
            alert("Failed to upload file");
        } finally {
            setIsUploading(false);
            if(fileInputRef.current) fileInputRef.current.value = null;
        }
    };

    const removeAttachment = (indexToRemove) => {
        setAttachments(attachments.filter((_, idx) => idx !== indexToRemove));
    };

    const isImage = (mimetype) => mimetype && mimetype.startsWith('image/');

    return (
        <div className="editor-overlay">
            <div className="editor-modal fade-in">
                <div className="editor-header">
                    <input 
                        type="text" 
                        className="editor-title" 
                        placeholder="Note Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="editor-actions">
                        <button className="btn btn-icon attachment-btn" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                            <FiPaperclip />
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            onChange={handleFileUpload} 
                        />
                        <button className="btn btn-icon save" onClick={handleSave}>
                            <FiCheck />
                        </button>
                        <button className="btn btn-icon close" onClick={onClose}>
                            <FiX />
                        </button>
                    </div>
                </div>

                <div className="editor-body">
                    <textarea 
                        className="editor-content"
                        placeholder="Write your note here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    
                    {attachments.length > 0 && (
                        <div className="attachments-grid">
                            {attachments.map((att, idx) => (
                                <div key={idx} className="attachment-item">
                                    <button className="attachment-remove" onClick={() => removeAttachment(idx)}>
                                        <FiX />
                                    </button>
                                    {isImage(att.mimetype) ? (
                                        <div className="attachment-image" style={{ backgroundImage: `url(${att.url})` }}></div>
                                    ) : (
                                        <div className="attachment-file">
                                            <FiFile className="file-icon" />
                                            <span className="file-name">{att.filename}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="editor-footer">
                    <div className="tags-container">
                        {tags.map((tag, i) => (
                            <span key={i} className="editor-tag">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)}>
                                    <FiX />
                                </button>
                            </span>
                        ))}
                    </div>
                    <input 
                        type="text" 
                        className="tag-input"
                        placeholder="Add tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
