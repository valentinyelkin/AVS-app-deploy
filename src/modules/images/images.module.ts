import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from '../../config/app/app.config.module';
import { Image } from '../../entities/image.entity';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, S3ManagerService],
  exports: [ImagesService],
  imports: [AppConfigModule, TypeOrmModule.forFeature([Image])],
})
export class ImagesModule {}
