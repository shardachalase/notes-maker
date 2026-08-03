import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authroutes.js';
import noteRoutes from './routes/noteroutes.js';
import { notfound, handleerror } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));
    app.use((req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
} else {
    app.use((req, res) => {
        res.status(404).send("Route not found");
    });
}

app.use(notfound);
app.use(handleerror);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});