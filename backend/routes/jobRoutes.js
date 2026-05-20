import express from 'express';
import { getJobs, postJob, seedJobs, getJobById } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getJobs)
    .post(protect, requireRole('recruiter'), postJob);

router.post('/seed', protect, seedJobs); // Remove in prod
router.get('/:id', protect, getJobById);
export default router;