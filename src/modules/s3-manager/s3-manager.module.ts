import { Module } from '@nestjs/common';

import { AppConfigService } from '../../config/app/app.config.service';
import { AwsConfig } from '../../config/aws.config';

import { S3ManagerService } from './s3-manager.service';

@Module({
  providers: [S3ManagerService, AppConfigService, AwsConfig],
  exports: [S3ManagerService],
})
export class S3ManagerModule {}
