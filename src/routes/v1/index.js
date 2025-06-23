import express from 'express';
import { uploadFile, getStatus } from '../../controller/upload-controller.js'
const router = express.Router();

router.post('/uploads', uploadFile);
router.get('/status/:id', getStatus);
export default router;