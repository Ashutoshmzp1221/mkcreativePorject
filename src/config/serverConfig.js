import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const AWS_REGION = process.env.AWS_REGION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
const BUCKET_NAME = process.env.BUCKET_NAME;

export {
    PORT,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    BUCKET_NAME
}