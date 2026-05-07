import { Router } from 'express';
import { emailRateLimiter } from '../config/rateLimiter.js';
import { handleSendEmail } from '../controllers/emailController.js';

const router = Router();

router.post('/send-email', emailRateLimiter, handleSendEmail);

export default router;