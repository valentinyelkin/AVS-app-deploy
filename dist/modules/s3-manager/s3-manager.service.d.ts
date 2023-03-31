/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import { S3 } from 'aws-sdk';
import { AwsConfig } from '../../config/aws.config';
export declare class S3ManagerService {
    private awsConfig;
    private readonly s3;
    constructor(awsConfig: AwsConfig, s3: S3);
    upload(key: string, content: Readable | Buffer): Promise<S3.ManagedUpload.SendData>;
    headObject(key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.HeadObjectOutput, import("aws-sdk").AWSError>>;
    deleteFile(key: string): Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
    getObject(key: string): Readable;
}
