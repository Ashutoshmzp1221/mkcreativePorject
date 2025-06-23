import { createChannel, subscribeMessage } from '../config/rabbitmq';

const startWorker = async () => {
    try {
        await createChannel();
        await subscribeMessage();
    } catch (error) {
        console.error('❌ Worker failed:', error.message);
        process.exit(1);
    }
};

startWorker();
