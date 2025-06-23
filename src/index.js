import express from 'express';
import { PORT } from './config/serverConfig.js';
import { createChannel } from './config/rabbitmq.js'
const app = express();
import {sequelize} from './config/db.js';
const setUpAndStartServer = () => {
    app.listen(PORT, async ()=> {
        await sequelize.sync();
        await createChannel();
        console.log(`server is sarted at port ${PORT}`);
    })
}

setUpAndStartServer();