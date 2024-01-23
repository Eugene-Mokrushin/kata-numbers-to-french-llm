import { Module } from '@nestjs/common';
import { NumbersModule } from './numbers/numbers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NumbersModule, ConfigModule.forRoot()],
})
export class AppModule {}
