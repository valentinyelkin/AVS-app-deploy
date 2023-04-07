import { applyDecorators, BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        limits: { fileSize: 1024 * 1024 * 2 }, // limit 2mb
        fileFilter(_req, file, cb) {
          if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/i)) {
            return cb(new BadRequestException('only image files are allowed'), false);
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
          productId: {
            type: 'string',
            format: 'text',
          },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  );
}
