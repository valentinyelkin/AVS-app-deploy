import { randomUUID } from 'node:crypto';

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  HttpCode,
  ParseIntPipe,
  Logger,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation, ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AWSError } from 'aws-sdk';
import { Response, Express } from 'express';
import { extension } from 'mime-types';

import { FileResponseMessageEnum } from '../../common/enums/file-response-message.enum';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

import { ApiFile } from './decorator/api-file.decorator';
import { FileResponseDto } from './dto/files.dto';

@ApiTags('files')
@Controller('files')
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(private s3Service: S3ManagerService) {}

  @ApiOperation({ summary: 'Add new file' })
  @ApiOkResponse({ type: FileResponseDto })
  @HttpCode(201)
  @ApiFile()
  @Post('/upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException(FileResponseMessageEnum.PROVIDE_FILE);
    }

    const { mimetype: mimeType } = await file;
    const fileName = `${randomUUID()}.${extension(mimeType)}`;

    const newFile = await this.s3Service.upload(fileName, file.buffer);

    this.logger.debug(`Successfully created file: ${fileName}`);
    return newFile;
  }

  @HttpCode(200)
  @ApiResponse({ type: Buffer })
  @ApiBadRequestResponse({ description: FileResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: FileResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Get file by id' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<Response> {
    try {
      await this.s3Service.headObject(id);

      const file = this.s3Service.getObject(id);

      console.log(file, 'file');
      return file.pipe(res)
    } catch (e) {
      throw (e as AWSError).statusCode === 404
        ? new NotFoundException(FileResponseMessageEnum.NOT_FOUND)
        : new InternalServerErrorException(e);
    }
  }

  @ApiBadRequestResponse({ description: FileResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: FileResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Update file by id' })
  @ApiOkResponse({ type: FileResponseDto })
  @ApiFile()
  @Patch(':id')
  async update(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: string) {
    await this.s3Service.deleteFile(id);

    if (!file) {
      throw new BadRequestException(FileResponseMessageEnum.PROVIDE_FILE);
    }

    const { originalname: fileName } = await file;

    await this.s3Service.upload(fileName, file.buffer);

  }
}
