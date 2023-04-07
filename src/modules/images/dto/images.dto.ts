import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImageResponseDto {
  @ApiProperty({ example: 1, description: 'Image id' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '56182030-2d13-42df-9b87-6b0887500dd3.jpeg', description: 'Image name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
