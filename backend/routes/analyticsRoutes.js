import express from 'express';
import { getSkillTrends, getApplicationFunnel, getScoreTimeline } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/skills/trending', getSkillTrends); // Public or authenticated? Let's make it public for the landing page teaser, or protect for users. We'll protect it.
router.get('/candidate/funnel', protect, getApplicationFunnel);
router.get('/candidate/scores', protect, getScoreTimeline);

export default router;