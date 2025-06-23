import { Upload } from '../models/upload.js';

class UploadRepository {
    async create(data) {
        try {
            const response = await Upload.create(data);
            return response;
        } catch (error) {
            console.log('something went wrong in the repository layer')
            throw error;
        }
    }

    async get(id) {
        try {
            const file = await Upload.findByPk(id);
            // console.log(file);
            return file;
        } catch (error) {
            console.log('something went wrong in the repository layer')
            throw error;
        }
    }

    async update(fileId, updateData) {
        try {
            const result = await Upload.update(updateData, {
                where: {
                    id: fileId
                }
            });
            return result; // [number of updated rows]
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
    
}

export default UploadRepository;