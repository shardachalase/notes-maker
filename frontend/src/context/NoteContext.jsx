import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);

    const API_URL = '/api/notes';

    const fetchNotes = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // According to noteController, backend returns just `notes` array directly now since I fixed it.
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, [token]);

    const addNote = async (noteData) => {
        try {
            const res = await axios.post(API_URL, noteData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes([res.data, ...notes]);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const updateNote = async (id, updatedData) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(notes.map(note => note._id === id ? res.data : note));
            return res.data;
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post(`${API_URL}/upload`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return res.data;
        } catch (err) {
            console.error("Upload error", err);
            throw err;
        }
    };

    return (
        <NoteContext.Provider value={{ notes, loading, fetchNotes, addNote, updateNote, deleteNote, uploadFile }}>
            {children}
        </NoteContext.Provider>
    );
};
