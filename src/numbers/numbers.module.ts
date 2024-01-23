import { Module } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { NumbersController } from './numbers.controller';
import { OpenAIService } from '../openai/openai.service';

@Module({
  providers: [NumbersService, OpenAIService],
  controllers: [NumbersController],
})
export class NumbersModule {}
