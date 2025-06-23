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
            return file;
        } catch (error) {
            console.log('something went wrong in the repository layer')
            throw error;
        }
    }

    async update(fielId , data) {
        try {
            await Upload.update(data, {
                where : {
                    id: fielId
                }
            })
            return true;
        } catch (error) {
            console.log('something went wrong in the repository layer')
            throw error;
        }
    }
}