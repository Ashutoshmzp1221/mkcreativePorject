import UploadService from "../service/upload-service.js";
import upload from "../config/file-upload.js";

const uploadService = new UploadService();
const singleUpload = upload.single('image');

export const uploadFile = (req, res) =>  {
    try {
        singleUpload(req, res, async(err, data) => {
            if(err) {
                return res.status(500).json({error : err})
            }
            const payload = req.body;
            payload.stored_path = req.file.location;
            const response = await uploadService.uploadFile(payload);
            return res.status(201).json({
                success: true,
                message: 'Succesfully requested for uploading data',
                data : {
                    upload_id: response.id,
                    status: response.status
                },
                err: {}
            });
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Not able upload',
            data: {},
            err: error
        })
    }
}

export const getStatus = async(req, res) => {
    try {
        const response = await uploadService.getFile(req.params.id);
        // console.log(response);
        const data = {
            upload_id: response.id,
            filename: response.filename,
            metadata: response.metadata,
            status: response.status,
            progress: response.progress
        }
        return res.status(201).json({
            success: true,
            message: 'Successfully fetched file data',
            res: data,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Not able fetched file data',
            data: {},
            err: error
        })
    }
}

export const downloadFile = async (req, res) => {
    try {
        const response = await uploadService.getFile(req.params.id);
        return res.status(201).json({
            success: true,
            message: 'Download link is fetched',
            downloadLink: response.stored_path,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Not able fetched Download link',
            downloadLink: {},
            err: error
        })
    }
}