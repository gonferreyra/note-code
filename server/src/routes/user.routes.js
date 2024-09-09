import { Router } from 'express';

const router = Router();

router.get('/:id', (req, res) => {
  const { id } = req.params;

  return res.json({
    message: 'User get working',
  });
});

export default router;
