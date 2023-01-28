import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import * as dto from './dto';

const baseUrl = 'https://api.openai.com/v1';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  private async gptApiPostRequest(url: string, inputData?: any) {
    const { data } = await lastValueFrom(
      this.httpService.request({
        method: 'POST',
        url,
        data: inputData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
      }),
    );

    return data;
  }

  async getModels() {
    const { data } = await lastValueFrom(
      this.httpService.request({
        method: 'GET',
        url: `${baseUrl}/models`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GPT_API_KEY}`,
        },
      }),
    );

    return data;
  }

  async createCompletion(inputData: dto.CreateCompletionDto) {
    const data = await this.gptApiPostRequest(`${baseUrl}/completions`, {
      ...inputData,
      max_tokens: 2048,
      model: 'text-davinci-003',
    });
    return data.choices;
  }

  async createEdits(inputData: dto.CreateEditsDto) {
    const data = await this.gptApiPostRequest(`${baseUrl}/edits`, {
      ...inputData,
      model: 'text-davinci-edit-001',
    });
    return data.choices;
  }
}
