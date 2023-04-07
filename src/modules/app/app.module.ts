import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';
import { DataSource } from 'typeorm';

import { AppConfigModule } from '../../config/app/app.config.module';
import { AwsConfig } from '../../config/aws.config';
import LoggerMiddleware from '../../middleware/logger/logger.middleware';
import { ImagesModule } from '../images/images.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),

    // AWS
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [AppConfigModule],
        inject: [AwsConfig],
        useFactory: (awsConfig: AwsConfig) => {
          return {
            region: awsConfig.s3Region,
            ...(awsConfig.localEndpoint
              ? {
                endpoint: awsConfig.localEndpoint,
                s3ForcePathStyle: true,
                signatureVersion: 'v4',
                accessKeyId: awsConfig.accessKeyId,
                secretAccessKey: awsConfig.secretAssessKey,
              }
              : {
                // endpoint: awsConfig.localEndpoint,
                s3ForcePathStyle: true,
                signatureVersion: 'v4',
                accessKeyId: awsConfig.accessKeyId,
                secretAccessKey: awsConfig.secretAssessKey,
              }),
          };
        },
      },
      services: [S3],
    }),
    UserModule,
    ImagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
