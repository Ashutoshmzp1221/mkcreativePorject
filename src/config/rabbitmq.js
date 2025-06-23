import amqplib from 'amqplib';
import { MESSAGE_BROKER_URL, EXCHANGE_NAME} from '../config/serverConfig.js';
import UploadRepository from '../repository/upload-repository.js';
import { startJob } from '../utils/jobs.js'

export const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME,'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
}

export const getChannel = (channel) => { 
    if (!channel) throw new Error('RabbitMQ not connected');
    return channel;
}
  
export const subscribeMessage = async(channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        channel.bindQueue(applicationQueue, EXCHANGE_NAME, binding_key);
        
        channel.consume(applicationQueue.queue, msg => {
            const { id } = JSON.parse(msg.content.toString());
            startJob(id);
        });
    } catch (error) {
        throw error;
    }
}

export const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error; 
    }
}

