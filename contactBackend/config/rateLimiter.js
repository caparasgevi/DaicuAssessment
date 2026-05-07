import rateLimit from 'express-rate-limit';

export const emailRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5,                    
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many messages sent. Please wait 15 minutes before trying again.',
  },
});