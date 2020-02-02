import { S3Client } from '@aws-sdk/client-s3-node/S3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3-node/commands/PutObjectCommand'
import { createReadStream } from 'fs'
import { Readable } from 'stream'
import { basename, resolve } from 'path'
import createPath from './create-path'

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: { accessKeyId: 'lol', secretAccessKey: 'kek' }
})

const getVersionTypes = (version: string): [string, string, string] => [
  version,
  version.replace(/^(\d+\.\d+)\.\d+/, '$1.x'),
  version.replace(/^(\d+)\.\d+\.\d+/, '$1.x')
]

const baseUpload = async (
  file: Readable,
  path: string,
  bucket: string
): Promise<void> => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Body: file,
    Bucket: bucket,
    Key: path,
    ContentType: 'application/javascript; charset=utf-8'
  })

  return s3.send(command).then(() => console.log('Uploaded: ', path))
}

const upload = async (
  filePaths: string[],
  pathTemplate: string,
  version: string,
  bucket: string,
  dryRun: boolean
): Promise<void> =>
  Promise.all(
    filePaths.flatMap(filePath => {
      const file = createReadStream(resolve(process.cwd(), filePath))

      return getVersionTypes(version).map(async version => {
        const path = createPath(pathTemplate, {
          version,
          filename: basename(filePath)
        })

        console.log('upload: ', path)

        if (!dryRun) {
          return baseUpload(file, path, bucket)
        }
      })
    })
  ).then(() => undefined)

export { upload, baseUpload }
