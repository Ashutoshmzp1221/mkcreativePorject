import UploadRepository from "../repository/upload-repository.js";
import { sleep } from './sleep.js'

const uploadRepository = new UploadRepository();
export const startJob = async (id) => {
    try {
        await uploadRepository.update({progress : 10}, id);

        for(let i = 20; i <= 100; i += 20) {
            await sleep(5000);
            await uploadRepository.update({progress: i}, id);
        }
        await uploadRepository.update({status: 'completed'});
    } catch (error) {
        await uploadRepository.update({status: 'failed'});
    }
}