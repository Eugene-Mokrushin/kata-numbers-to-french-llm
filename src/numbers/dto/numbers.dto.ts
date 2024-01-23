import { IsNotEmpty, IsString } from 'class-validator';

export class TranslateDto {
  @IsNotEmpty()
  number: number | number[];

  @IsNotEmpty()
  @IsString()
  language: 'fr' | 'bg';

  @IsNotEmpty()
  @IsString()
  model: 'gpt-3.5-turbo' | 'gpt-4';
}
