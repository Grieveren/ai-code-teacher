import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// AI-specific rate limiter (more restrictive)
export const aiRateLimiter = rateLimit({
  windowMs: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.AI_RATE_LIMIT_MAX_REQUESTS || '10'),
  message: 'AI request limit exceeded. Please wait before making more AI requests.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});