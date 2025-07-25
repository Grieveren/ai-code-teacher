import { Router } from 'express';
import lessonService from '../../services/lessonService';

const router = Router();

// Get all lessons
router.get('/', async (_req, res, next): Promise<void> => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.json({ lessons, total: lessons.length });
  } catch (error) {
    next(error);
  }
});

// Get lesson by ID
router.get('/:id', async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const lesson = await lessonService.getLessonById(Number(id));
    if (!lesson) {
      res.status(404).json({ error: 'Lesson not found' });
      return;
    }
    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

// Get exercises for a lesson
router.get('/:id/exercises', async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;
    const exercises = await lessonService.getExercisesForLesson(Number(id));
    res.json({ exercises, lessonId: id });
  } catch (error) {
    next(error);
  }
});

// Submit exercise solution
router.post('/:lessonId/exercises/:exerciseId/submit', async (req, res, next): Promise<void> => {
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