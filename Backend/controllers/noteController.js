import note from "../models/notes.js";
import user from "../models/users.js";

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.status(200).json({
            url: `/uploads/${req.file.filename}`,
            filename: req.file.originalname,
            mimetype: req.file.mimetype
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

export const getnotes = async (req, res) => {
    try {
        const notes = await note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

export const addnote = async (req, res) => {
    try {
        const { title, content, tags, attachments } = req.body;
        const newNote = await note.create({
            user: req.user.id,
            title,
            content,
            tags,
            attachments
        }); 
        res.status(201).json(newNote);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

export const updatenote = async (req, res) => {
    try {
        const existingNote = await note.findById(req.params.id);

        if (!existingNote) {
            return res.status(404).json({ message: "note not found" });
        }
        if (existingNote.user.toString() != req.user.id) {
            return res.status(401).json({ message: "unAuthorised" })
        }

        const upNote = await note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(upNote);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletenote = async (req, res) => {
    try {
        const fire = await note.findById(req.params.id);

        if (!fire) {
            return res.status(404).json({ message: "note is not found" });
        }
        if (fire.user.toString() != req.user.id) {
            return res.status(401).json({ message: "unauthorised" });
        }
        await note.deleteOne({ _id: req.params.id });
        res.json({ message: "note removed", id: req.params.id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}