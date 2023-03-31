/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'multer';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3333'],
    },
  });

  const configService = app.get(ConfigService);
  const environment = configService.get('NODE_ENV');
  app.useLogger(
    environment === 'development' ? ['log', 'debug', 'error', 'verbose', 'warn'] : ['error', 'warn']
  );

  app.useGlobalPipes(new ValidationPipe());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('Banda Deploy')
    .setDescription('Base api with user entities and file upload ')
    .setVersion('1.0.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(`https://34.228.162.250/${port}`);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
