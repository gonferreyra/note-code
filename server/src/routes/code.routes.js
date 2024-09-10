import { Router } from 'express';
import { createCode, getCodeById } from '../controllers/code.controller.js';

const router = Router();

router.get('/:id', getCodeById);
router.post('/', createCode);

export default router;
