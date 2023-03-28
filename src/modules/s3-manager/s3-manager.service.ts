import { Readable } from 'stream';

import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

import { AwsConfig } from '../../config/aws.config';

@Injectable()
export class S3ManagerService {
  constructor(private awsConfig: AwsConfig, @InjectAwsService(S3) private readonly s3: S3) {}

  async upload(key: string, content: Readable | Buffer) {
    return this.s3.upload({ Bucket: this.awsConfig.s3Bucket, Key: key, Body: content }).promise();
  }

  async headObject(key: string) {
    return this.s3
      .headObject({
        Bucket: this.awsConfig.s3Bucket,
        Key: key,
      })
      .promise();
  }

  async deleteFile(key: string) {
    return this.s3
      .deleteObject({
        Key: key,
        Bucket: this.awsConfig.s3Bucket,
      })
      .promise();
  }

  getObject(key: string) {
    return this.s3
      .getObject({
        Bucket: this.awsConfig.s3Bucket,
        Key: key,
      })
      .createReadStream();
  }
}
