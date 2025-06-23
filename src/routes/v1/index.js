import express from 'express';
import { uploadFile, getStatus, downloadFile, getFiles } from '../../controller/upload-controller.js'
const router = express.Router();

router.post('/uploads', uploadFile);
router.get('/status/:id', getStatus);
router.get('/download/:id', downloadFile);
router.get('/files', getFiles);
export default router;