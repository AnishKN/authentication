import { Router } from 'express';
import { signup, signin, verifyOtp } from '../controllers/auth';

const router = Router();

// Signup Route
router.post('/signup', signup);

// Sign-in Route
router.post('/signin', signin);

// Verify OTP Route
router.post('/verify', verifyOtp);

export default router;
