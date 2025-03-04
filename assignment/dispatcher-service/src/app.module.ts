import { Module } from '@nestjs/common';
import { DispatcherController } from './dispatcher/dispatcher.controller';
import { DispatcherModule } from './dispatcher/dispatcher.module';

@Module({
  imports: [DispatcherModule],
  controllers: [DispatcherController],
})
export class AppModule {}