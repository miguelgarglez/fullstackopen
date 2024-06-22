import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.post('/', (req, res) => {
  res.send(diagnoseService.addEntry(req.body));
});

export default router;