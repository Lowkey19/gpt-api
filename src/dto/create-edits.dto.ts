import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEditsDto {
  @IsString()
  @ApiProperty()
  input: string;

  @IsString()
  @ApiProperty()
  instruction: string;
}
