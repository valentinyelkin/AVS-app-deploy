import { AppConfigService } from './app/app.config.service';
export declare class AwsConfig {
    private readonly configService;
    readonly accessKey?: string;
    readonly secretKey?: string;
    readonly s3Region: string;
    readonly s3Bucket: string;
    readonly localEndpoint?: string;
    constructor(configService: AppConfigService);
}
