import express from 'express';
import { uploadAndExtractMedicines } from '../controller/ocrController.js';

const router = express.Router();

router.post('/upload', uploadAndExtractMedicines);

export default router;