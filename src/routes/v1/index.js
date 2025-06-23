import express from 'express';
import { uploadFile } from '../../controller/upload-controller.js'
const router = express.Router();

router.post('/uploads', uploadFile);

export default router;