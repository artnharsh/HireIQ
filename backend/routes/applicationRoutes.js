import express from 'express';
import { applyToJob, getMyApplications, draftCoverLetter } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Candidate only routes
router.use(protect);
router.use(requireRole('candidate'));

router.post('/', applyToJob);
router.get('/my', getMyApplications);
router.post('/cover-letter', draftCoverLetter);

export default router;