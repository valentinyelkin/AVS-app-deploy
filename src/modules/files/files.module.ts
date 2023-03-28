import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config/app/app.config.module';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController],
  providers: [FilesService, S3ManagerService],
  exports: [FilesService],
  imports: [AppConfigModule],
  // imports: [AppConfigModule, TypeOrmModule.forFeature([File])],
})
export class FilesModule {}
