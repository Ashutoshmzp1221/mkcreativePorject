import UploadRepository from "../repository/upload-repository.js";
import { createChannel, publishMessage, getChannel, subscribeMessage} from '../config/rabbitmq.js'
import { BINDING_KEY } from '../config/serverConfig.js';

class UploadService {
    constructor() {
        this.uploadRepository = new UploadRepository();
    }

    async uploadFile(data) {
        try {
            const response = await this.uploadRepository.create(data);
            const channel = getChannel();
            await publishMessage(channel, BINDING_KEY, JSON.stringify({ id: response.id }));

            return response;
        } catch (error) {
            console.log('Something went wrong');
            throw error;
        }
    }
}

export default UploadService;