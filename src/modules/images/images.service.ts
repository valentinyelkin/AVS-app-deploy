import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileResponseMessageEnum } from '../../common/enums/file-response-message.enum';
import { Image } from '../../entities/image.entity';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async findOneById(id) {
    const image = await this.imageRepository.findOneBy({ id });

    if (!image) {
      this.logger.error(FileResponseMessageEnum.NOT_FOUND);
      throw new NotFoundException(FileResponseMessageEnum.NOT_FOUND);
    }

    this.logger.log(`Image by id: ${id}`);
    return image;
  }

  async uploadFile(fileName: string): Promise<Image> {
    return this.imageRepository.save({ name: fileName });
  }

  async findOne(fileName: number): Promise<Image> {
    return await this.findOneById(fileName);
  }

  async update(id: number, fileName: string) {
    return this.imageRepository.update(id, { name: fileName });
  }

  async remove(id: number) {
    const image = await this.findOneById(id);

    await this.imageRepository.remove(image);

    this.logger.log(`Image with id: ${id} removed`);
  }
}
