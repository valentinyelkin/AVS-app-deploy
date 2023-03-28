import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';
import { UsersResponseMessageEnum } from '../../common/enums/users-response-message.enum';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Add new user' })
  @HttpCode(201)
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiConflictResponse({ description: UsersResponseMessageEnum.DUPLICATE })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @HttpCode(200)
  @ApiOkResponse({ type: [ResponseUserDto] })
  @ApiNotFoundResponse({ description: UsersResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Get all Users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @HttpCode(200)
  @ApiOkResponse({ type: ResponseUserDto })
  @ApiBadRequestResponse({ description: UsersResponseMessageEnum.BAD_REQUEST })
  @ApiNotFoundResponse({ description: UsersResponseMessageEnum.NOT_FOUND })
  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
