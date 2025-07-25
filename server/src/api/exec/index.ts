import { Router } from 'express';
import codeExecutionService from '../../services/codeExecutionService';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { language, code } = req.body;
    const result = await codeExecutionService.runCode(language, code);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
