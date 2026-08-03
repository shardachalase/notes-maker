import express from 'express';
const router = express.Router();
import authMiddleware from "../middleware/authmiddleware.js";

import { getnotes, addnote, updatenote, deletenote, uploadFile } from '../controllers/noteController.js';
import upload from '../middleware/upload.js';

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.get('/', authMiddleware, getnotes);

router.post('/', authMiddleware, addnote);

router.put('/:id', authMiddleware, updatenote);

router.delete('/:id', authMiddleware, deletenote);

export default router;
