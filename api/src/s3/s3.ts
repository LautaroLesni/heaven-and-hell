import aws from 'aws-sdk'
import dotenv from 'dotenv'
import crypto from 'crypto'
import { promisify } from 'util'

dotenv.config()

const randomBytes = promisify(crypto.randomBytes)

const bucketname = 'heaven-and-hell'
const s3 = new aws.S3({
    region:'sa-east-1',
    accessKeyId: process.env.AWS_SECRET_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_PASSWORD,
    signatureVersion:'v4'
})

export async function generateUploadURL(){
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketname,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}