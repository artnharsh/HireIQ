import express from 'express';
import { uploadResume, analyzeWithJD, getMyResume } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadResume);
router.post('/analyze', protect, analyzeWithJD);
router.get('/me', protect, getMyResume);

export default router;