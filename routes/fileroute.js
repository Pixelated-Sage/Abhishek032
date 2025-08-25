import express from 'express';
import multer from 'multer';
import { upload, download } from '../controllers/fileController.js';

const router = express.Router();
const uploadMiddleware = multer({ dest: "uploads/" });

router.post('/upload', uploadMiddleware.single('file'), upload);
router.get('/download/:id', download);

export default router;
