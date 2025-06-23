import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config/serverConfig.js';
import { createChannel } from './config/rabbitmq.js'
import apiRoutes from './routes/index.js'

const app = express();
import {sequelize} from './config/db.js';
const setUpAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    await sequelize.sync();
    await createChannel();
    app.use('/api', apiRoutes);
    app.listen(PORT, async ()=> {
        console.log(`server is sarted at port ${PORT}`);
    })
}

setUpAndStartServer();