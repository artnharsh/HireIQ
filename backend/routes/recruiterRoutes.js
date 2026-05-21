import express from 'express';
import { bulkScreenResumes, getScreeningSessions, downloadShortlist } from '../controllers/recruiterController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(requireRole('recruiter'));

// Note: upload.array('files', 50) handles the multi-part file array
router.post('/bulk-screen', upload.array('files', 50), bulkScreenResumes);
router.get('/sessions', getScreeningSessions);
router.get('/sessions/:id/download', downloadShortlist);

export default router;