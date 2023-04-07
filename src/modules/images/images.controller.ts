import { randomUUID } from 'node:crypto';

import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
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
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AWSError } from 'aws-sdk';
import { Response, Express } from 'express';
import { extension } from 'mime-types';
import { FileResponseMessageEnum } from '../../common/enums/file-response-message.enum';

import { S3ManagerService } from '../s3-manager/s3-manager.service';

import { ApiFile,   } from './decorator/api-file.decorator';
import { ImageResponseDto } from './dto/images.dto';
import { ImagesService } from './images.service';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  constructor(private s3Service: S3ManagerService, private readonly imagesService: ImagesService) {}

  @ApiOperation({ summary: 'Add new Images' })
  @ApiOkResponse({ type: ImageResponseDto })
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

    await this.s3Service.upload(fileName, file.buffer);

    const createdFile = await this.imagesService.uploadFile(fileName);

    this.logger.debug(`Successfully created image: ${fileName}`);
    return createdFile;
  }

  @HttpCode(200)
  @ApiBadRequestResponse({ description: FileResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: FileResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Get image by id' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
    const image = await this.imagesService.findOne(id);

    if (!image) {
      throw new NotFoundException();
    }

    try {
      const { name } = image;

      await this.s3Service.headObject(name);

      return this.s3Service.getObject(name).pipe(res);
    } catch (e) {
      throw (e as AWSError).statusCode === 404
        ? new NotFoundException(FileResponseMessageEnum.NOT_FOUND)
        : new InternalServerErrorException(e);
    }
  }

  @ApiBadRequestResponse({ description: FileResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: FileResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Update image by id' })
  @ApiOkResponse({ type: ImageResponseDto })
  @ApiFile()
  @Patch(':id')
  async update(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    const olfFile = await this.imagesService.findOneById(id);

    await this.s3Service.deleteFile(olfFile.name);

    if (!file) {
      throw new BadRequestException(FileResponseMessageEnum.PROVIDE_FILE);
    }

    const { originalname: fileName } = await file;

    await this.s3Service.upload(fileName, file.buffer);

    return this.imagesService.update(id, fileName);
  }

  @HttpCode(204)
  @ApiBadRequestResponse({ description: FileResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: FileResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Delete image by id' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const file = await this.imagesService.findOneById(id);

    await this.imagesService.remove(id);

    await this.s3Service.deleteFile(file.name);
  }
}
