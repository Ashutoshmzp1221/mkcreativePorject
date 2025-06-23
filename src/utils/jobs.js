import UploadRepository from "../repository/upload-repository.js";
import {sequelize} from '../config/db.js';
import { sleep } from './sleep.js'

const uploadRepository = new UploadRepository();
export const startJob = async (id) => {
    try {
        // await sequelize.sync();
        const response = await uploadRepository.update(id, {progress : 10, status: 'processing'});
        console.log(response);
        // console.log('job started');
        for(let i = 20; i <= 100; i += 20) {
            await sleep(5000);
            // console.log('job num :', i);
            await uploadRepository.update(id,{progress: i});
        }
        // console.log('jobend');
        await uploadRepository.update(id, {status: 'completed'});
        await sequelize.sync();
    } catch (error) {
        await uploadRepository.update(id, {status: 'failed'});
    }
}