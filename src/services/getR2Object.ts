import { S3Client, GetObjectCommand, ListObjectsV2Command, ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";
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

interface GetR2ObjectType {
    (bucket: string, key: string): Promise<string>
}

const getR2Object: GetR2ObjectType = async(bucket, key) => {
    const url = await getSignedUrl(
        S3,
        new GetObjectCommand({Bucket: bucket, Key: key}),
        {expiresIn: 3600}
    )

    return url
}


type RetrieveProjectImagesType = (
    bucket: string,
    dirKey: string
) => Promise<ListObjectsV2CommandOutput>

//

export const retrieveProjectImages: RetrieveProjectImagesType = async(bucket, dirKey) => {
    const projectObjects = await S3.send(new ListObjectsV2Command({Bucket: bucket, Prefix: dirKey}))

    return projectObjects
}

export default getR2Object