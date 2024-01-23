import { Body, Controller, Post } from '@nestjs/common';
import { NumbersService } from './numbers.service';
import { TranslateDto } from './dto';

@Controller('numbers')
export class NumbersController {
  constructor(private numbersService: NumbersService) {}

  @Post('/translate')
  async translate(@Body() dto: TranslateDto) {
    return { data: await this.numbersService.translate(dto) };
  }
}
