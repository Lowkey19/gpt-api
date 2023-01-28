import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompletionDto {
  @IsString()
  @ApiProperty()
  prompt: string;
}
