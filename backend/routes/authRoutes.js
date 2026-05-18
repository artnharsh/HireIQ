import express from 'express';
import passport from 'passport';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import generateToken from '../utils/generateToken.js';
import '../config/passport.js'; // Initialize strategy

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// --- Google OAuth Routes ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login` }),
    (req, res) => {
        // Successful authentication, generate JWT
        const token = generateToken(req.user._id);
        // Redirect to frontend and pass token in URL
        res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
    }
);

export default router;