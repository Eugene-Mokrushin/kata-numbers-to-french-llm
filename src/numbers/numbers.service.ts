import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { TranslateDto } from './dto';

@Injectable()
export class NumbersService {
  constructor(private openaiSeervice: OpenAIService) {}

  async translate(dto: TranslateDto) {
    const { number } = dto;
    if (typeof number === 'number') {
      return await this.openAiCall(dto.language, number, dto.model);
    } else if (Array.isArray(number)) {
      const repliesPromises = number.map((num) => {
        return this.openAiCall(dto.language, num, dto.model);
      });
      const repliesArray = (await Promise.all(repliesPromises)).map((r) =>
        r.toLowerCase(),
      );
      return repliesArray;
    } else {
      return null;
    }
  }

  private async openAiCall(
    language: 'fr' | 'bg',
    number: number,
    model: 'gpt-3.5-turbo' | 'gpt-4',
  ) {
    return await this.openaiSeervice.generateTranslateReply(
      model,
      number,
      language,
    );
  }
}
