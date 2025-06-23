import UploadRepository from "../repository/upload-repository.js";
import { publishMessage, getChannel, subscribeMessage} from '../config/rabbitmq.js'
import { BINDING_KEY } from '../config/serverConfig.js'
class UploadService {
    constructor() {
        this.uploadRepository = new UploadRepository();
    }

    async uploadFile(data) {
        try {
            const response = await this.uploadRepository.create(data);
            const channel = getChannel();
            publishMessage(channel, BINDING_KEY, Buffer.from(JSON.stringify(data.id)));
            subscribeMessage(channel, undefined, BINDING_KEY);

            return response;
        } catch (error) {
            console.log('Something went wrong');
            throw error;
        }
    }
}