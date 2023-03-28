import { applyDecorators, BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        limits: { fileSize: 1024 * 1024 * +process.env.FILE_LIMIT },
        fileFilter(_req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png|webp|pdf)$/i)) {
            return cb(new BadRequestException('only image and pdf files are allowed'), false);
          }
          return cb(null, true);
        },
      })
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  );
}
