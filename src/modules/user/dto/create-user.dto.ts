import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'banda', description: 'user name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
