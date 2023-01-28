import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import * as dto from './dto';
import { AppService } from './app.service';

@Controller({
  path: 'gpt',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/models')
  @HttpCode(HttpStatus.OK)
  @ApiTags('GPT')
  @ApiOperation({
    description: 'Lists the currently available models',
  })
  async getModels() {
    return this.appService.getModels();
  }

  @Post('/completions')
  @HttpCode(HttpStatus.OK)
  @ApiTags('GPT')
  @ApiOperation({
    description: 'Creates a completion for the provided prompt',
  })
  async createCompletion(@Body() inputData: dto.CreateCompletionDto) {
    return this.appService.createCompletion(inputData);
  }

  @Post('/edits')
  @HttpCode(HttpStatus.OK)
  @ApiTags('GPT')
  @ApiOperation({
    description: 'Creates a new edit for the provided input and instruction',
  })
  async createEdits(@Body() inputData: dto.CreateEditsDto) {
    return this.appService.createEdits(inputData);
  }
}
