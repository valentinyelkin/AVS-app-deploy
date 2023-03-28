import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FileResponseDto {
  @ApiProperty({ example: '56182030-2d13-42df-9b87-6b0887500dd3.jpeg', description: 'File name' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    example: 'http://127.0.0.1:9000/bucket/56182030-2d13-42df-9b87-6b0887500dd3.jpeg',
    description: 'File location'
  })
  @IsString()
  @IsNotEmpty()
  Location: string;

  @ApiProperty({ example: 'bucket', description: 'bucket' })
  @IsString()
  @IsNotEmpty()
  Bucket: string;
}
