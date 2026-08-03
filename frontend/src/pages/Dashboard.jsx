import React, { useState, useContext } from 'react';
import { FiPlus, FiMenu } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import NoteEditor from '../components/NoteEditor';
import { NoteContext } from '../context/NoteContext';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { notes, addNote, updateNote, deleteNote, loading } = useContext(NoteContext);
    const { user } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCreateNew = () => {
        setSelectedNote(null);
        setIsEditorOpen(true);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setIsEditorOpen(true);
    };

    const handleSaveNote = async (noteData) => {
        if (noteData._id) {
            await updateNote(noteData._id, noteData);
        } else {
            await addNote(noteData);
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            await deleteNote(noteId);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isMobileOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            
            <main className="main-content">
                <header className="dashboard-header glass">
                    <div className="header-left">
                        <button className="menu-btn" onClick={toggleSidebar}>
                            <FiMenu />
                        </button>
                        <h2>Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'}, {user?.name?.split(' ')[0]}</h2>
                    </div>
                </header>

                <div className="content-inner">
                    <div className="content-toolbar">
                        <h3>My Notes</h3>
                    </div>

                    {loading ? (
                        <div className="loading-state">Loading notes...</div>
                    ) : notes?.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-illustration">📝</div>
                            <h3>No notes yet</h3>
                            <p>Capture your first idea by creating a new note.</p>
                        </div>
                    ) : (
                        <div className="notes-grid">
                            {notes?.map(note => (
                                <NoteCard 
                                    key={note._id} 
                                    note={note} 
                                    onClick={handleEditNote} 
                                    onDelete={handleDeleteNote}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <button className="fab fade-in" onClick={handleCreateNew}>
                    <FiPlus />
                </button>
            </main>

            {isEditorOpen && (
                <NoteEditor 
                    note={selectedNote} 
                    onClose={() => setIsEditorOpen(false)} 
                    onSave={handleSaveNote} 
                />
            )}
        </div>
    );
};

export default Dashboard;
