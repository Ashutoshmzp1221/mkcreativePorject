import express from 'express';
import bodyParser from 'body-parser';
import { BINDING_KEY, PORT } from './config/serverConfig.js';
import { createChannel,subscribeMessage } from './config/rabbitmq.js'
import apiRoutes from './routes/index.js'

const app = express();
import {sequelize} from './config/db.js';
const setUpAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    await sequelize.sync();
    const channel = await createChannel();

    await subscribeMessage(channel,undefined, BINDING_KEY);
    app.use('/api', apiRoutes);
    app.listen(PORT, async ()=> {
        console.log(`server is sarted at port ${PORT}`);
    })
}

setUpAndStartServer();