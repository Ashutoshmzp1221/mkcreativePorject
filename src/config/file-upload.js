import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { ACCESS_KEY_ID, BUCKET_NAME, AWS_REGION, AWS_SECRET_ACCESS_KEY} from './serverConfig';


const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
   storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
   })
});

export default upload;