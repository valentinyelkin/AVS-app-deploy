import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersResponseMessageEnum } from '../../common/enums/users-response-message.enum';
import { User } from '../../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOneBy(where) {
    const user = await this.userRepository.findOne({
      where: { ...where },
    });

    if (!user) {
      this.logger.error(UsersResponseMessageEnum.NOT_FOUND);
      throw new NotFoundException(UsersResponseMessageEnum.NOT_FOUND);
    }

    this.logger.log(`User by id: ${where.id}`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
     const user = await this.userRepository.findOneBy({ name: createUserDto.name })

    if (user) {
      this.logger.error(UsersResponseMessageEnum.DUPLICATE);
      throw new NotFoundException(UsersResponseMessageEnum.DUPLICATE);
    }

    return this.userRepository.save({
      name: createUserDto.name,
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOneBy({ id });

    await this.userRepository.update(id, {
      name: updateUserDto.name,
    });

    this.logger.log(`User updated`);
    return {
      message: `User updated`,
    };
  }
}
