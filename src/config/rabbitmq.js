import amqplib from 'amqplib';
import { sequelize } from './db.js'
import { MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME } from './serverConfig.js';
import { startJob } from '../utils/jobs.js';

let channel = null;

export const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        channel = await connection.createChannel(); // ✅ assign to global channel
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } catch (error) {
        throw error;
    }
};

export const getChannel = () => {
    if (!channel) throw new Error('RabbitMQ not connected');
    return channel;
};

export const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue(QUEUE_NAME);
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key); // ✅ fix: use .queue
        
        channel.consume(applicationQueue.queue, async (msg) => {
            if (msg !== null) {
                await sequelize.sync();
                const { id } = JSON.parse(msg.content.toString());
                console.log(`📥 Received job for ID: ${id}`);
                await startJob(id);
                channel.ack(msg);
            }
        });
    } catch (error) {
        throw error;
    }
};

export const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error; 
    }
};
