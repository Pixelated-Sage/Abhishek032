import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('File route is working!');
});

export default router;