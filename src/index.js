import express from 'express';
import { PORT } from './config/serverConfig.js'
const app = express();


const setUpAndStartServer = () => {
    app.listen(PORT, ()=> {
        console.log(`server is sarted at port ${PORT}`);
    })
}

setUpAndStartServer();