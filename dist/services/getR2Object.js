"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const CF_ACCESS_KEY = String(process.env.CF_ACCESS_KEY);
const CF_SECRET_KEY = String(process.env.CF_SECRET_KEY);
const CF_ACCOUNT_ID = String(process.env.CF_ACCOUNT_ID);
const S3 = new client_s3_1.S3Client({
    region: 'auto',
    endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: CF_ACCESS_KEY,
        secretAccessKey: CF_SECRET_KEY
    }
});
const getR2Object = (bucket, key) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(S3, new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: key }), { expiresIn: 3600 });
    return url;
});
exports.default = getR2Object;
