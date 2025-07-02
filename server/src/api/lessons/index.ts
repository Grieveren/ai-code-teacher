import { Router } from 'express';

const router = Router();

// Get all lessons
router.get('/', async (req, res, next) => {
  try {
    // TODO: Implement get all lessons
    res.json({
      lessons: [],
      total: 0,
    });
  } catch (error) {
    next(error);
  }
});

// Get lesson by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Implement get lesson by ID
    res.json({
      message: `Get lesson ${id} - to be implemented`,
    });
  } catch (error) {
    next(error);
  }
});

// Get exercises for a lesson
router.get('/:id/exercises', async (req, res, next) => {
  try {
    const { id } = req.params;
    // TODO: Implement get exercises
    res.json({
      exercises: [],
      lessonId: id,
    });
  } catch (error) {
    next(error);
  }
});

// Submit exercise solution
router.post('/:lessonId/exercises/:exerciseId/submit', async (req, res, next) => {
  try {
    const { lessonId, exerciseId } = req.params;
    const { code } = req.body;
    // TODO: Implement solution submission
    res.json({
      message: 'Solution submission - to be implemented',
      lessonId,
      exerciseId,
    });
  } catch (error) {
    next(error);
  }
});

export default router;