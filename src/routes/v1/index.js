import express from 'express';
import { uploadFile, getStatus, downloadFile } from '../../controller/upload-controller.js'
const router = express.Router();

router.post('/uploads', uploadFile);
router.get('/status/:id', getStatus);
router.get('/download/:id', downloadFile);
export default router;