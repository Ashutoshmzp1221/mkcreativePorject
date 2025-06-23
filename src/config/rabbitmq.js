import amqplib from 'amqplib';
import { MESSAGE_BROKER_URL, EXCHANGE_NAME, QUEUE_NAME } from './serverConfig.js';
import { startJob } from '../utils/jobs.js';

let channel = null;

export const createChannel = async () => {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
    await channel.assertQueue(QUEUE_NAME);
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, QUEUE_NAME);
};

export const getChannel = () => {
    if (!channel) throw new Error('RabbitMQ not connected');
    return channel;
};

export const publishMessage = async (channel, bindingKey, message) => {
    channel.publish(EXCHANGE_NAME, bindingKey, Buffer.from(message));
};

export const subscribeMessage = async () => {
    await channel.consume(QUEUE_NAME, async (msg) => {
        if (msg !== null) {
            const { id } = JSON.parse(msg.content.toString());
            await startJob(id);
            channel.ack(msg);
        }
    });
};