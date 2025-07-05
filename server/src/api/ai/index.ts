import { Router } from 'express';
import { aiRateLimiter } from '../../middleware/rateLimiter';
import { optionalAuth } from '../../middleware/auth';
import OpenAIService from '../../services/openai/openaiService';

const router = Router();

// Apply AI-specific rate limiting and optional authentication
router.use(aiRateLimiter);
router.use(optionalAuth);

// Explain code endpoint
router.post('/explain', async (req, res, next) => {
  try {
    const { code, language } = req.body;
    const result = await OpenAIService.explainCode(code, language);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Debug assistance endpoint
router.post('/debug', async (req, res, next) => {
  try {
    const { code, error, language } = req.body;
    const result = await OpenAIService.debugCode(code, error, language);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Generate hint endpoint
router.post('/hint', async (req, res, next) => {
  try {
    const { exerciseId, currentCode, attemptCount } = req.body;
    // In a real app, you'd fetch exercise context from a database using exerciseId
    const exerciseContext = "A simple function to add two numbers.";
    const result = await OpenAIService.generateHint(exerciseContext, currentCode, attemptCount);
    res.json({ hint: result, level: attemptCount });
  } catch (error) {
    next(error);
  }
});

// Code review endpoint
router.post('/review', async (req, res, next) => {
  try {
    const { code, language, context } = req.body;
    const result = await OpenAIService.reviewCode(code, language, context);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
