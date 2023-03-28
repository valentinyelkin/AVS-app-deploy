import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig } from '../aws.config';

import { AppConfigService } from './app.config.service';

@Module({
  providers: [AwsConfig, ConfigService, AppConfigService],
  exports: [AwsConfig, AppConfigService],
})
export class AppConfigModule {}
