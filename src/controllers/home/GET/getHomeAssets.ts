import { RequestHandler } from "express";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from 'dotenv'
dotenv.config()

const CF_ACCESS_KEY = String(process.env.CF_ACCESS_KEY)

const CF_SECRET_KEY = String(process.env.CF_SECRET_KEY)

const CF_ACCOUNT_ID = String(process.env.CF_ACCOUNT_ID)
const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: CF_ACCESS_KEY,
        secretAccessKey: CF_SECRET_KEY
    }
})

const getHomeAssets: RequestHandler = async(req, res, next) => {
    try{
        const url = await getSignedUrl(
            S3,
            new GetObjectCommand({Bucket: 'hallowedvisions', Key: "angelwingsO.glb"}),
            {expiresIn: 3600}
        )
        res.json({url: url})
    } catch(error) {
        next(error)
    }
}

export default getHomeAssets