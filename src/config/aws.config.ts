import { Injectable } from '@nestjs/common';

import { AppConfigService } from './app/app.config.service';

@Injectable()
export class AwsConfig {
  readonly accessKeyId?: string;

  readonly secretAssessKey?: string;

  readonly s3Region: string;

  readonly s3Bucket: string;

  readonly localEndpoint?: string;

  constructor(private readonly configService: AppConfigService) {
    this.s3Region = this.configService.get('AWS_S3_REGION');
    this.s3Bucket = this.configService.get('AWS_S3_BUCKET');

    if (process.env.NODE_ENV === 'development') {
      this.accessKeyId = this.configService.get('AWS_ACCESS_KEY');
      this.secretAssessKey = this.configService.get('AWS_SECRET_KEY');
      // this.localEndpoint = this.configService.get('AWS_LOCAL_ENDPOINT');
    }
  }
}
