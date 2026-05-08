import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReadingStatusService } from './reading_status.service';
import { ReadingStatusController } from './reading_status.controller';
import { ReadingStatus } from './entities/reading_status.entity';

@Module({
  controllers: [ReadingStatusController],
  providers: [ReadingStatusService],
  imports: [TypeOrmModule.forFeature([ReadingStatus])],
})
export class ReadingStatusModule {}
