import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { AwsSdkModule } from 'nest-aws-sdk';

import { AppConfigModule } from '../../config/app/app.config.module';
import { AwsConfig } from '../../config/aws.config';
import LoggerMiddleware from '../../middleware/logger/logger.middleware';

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
                  accessKeyId: awsConfig.accessKey,
                  secretAccessKey: awsConfig.secretKey,
                }
              : {}),
          };
        },
      },
      services: [S3],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
