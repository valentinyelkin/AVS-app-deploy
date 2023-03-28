import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponseUserDto {
  @ApiProperty({ example: 1, description: 'User id' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'banda', description: 'user name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
