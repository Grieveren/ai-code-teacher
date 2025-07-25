import { Router } from 'express';
import aiRoutes from './ai';
import authRoutes from './auth';
import lessonsRoutes from './lessons';
import progressRoutes from './progress';
import execRoutes from './exec';

const router = Router();

// API version and status
router.get('/', (req, res) => {
  res.json({
    version: '1.0.0',
    status: 'active',
    endpoints: {
      ai: '/api/ai',
      auth: '/api/auth',
      lessons: '/api/lessons',
      progress: '/api/progress',
      exec: '/api/exec',
    },
  });
});

// Mount routes
router.use('/ai', aiRoutes);
router.use('/auth', authRoutes);
router.use('/lessons', lessonsRoutes);
router.use('/progress', progressRoutes);
router.use('/exec', execRoutes);

export default router;