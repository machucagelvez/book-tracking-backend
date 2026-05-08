import { Injectable } from '@nestjs/common';
import { CreateReadingStatusDto } from './dto/create-reading_status.dto';
import { UpdateReadingStatusDto } from './dto/update-reading_status.dto';

@Injectable()
export class ReadingStatusService {
  create(createReadingStatusDto: CreateReadingStatusDto) {
    return 'This action adds a new readingStatus';
  }

  findAll() {
    return `This action returns all readingStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} readingStatus`;
  }

  update(id: number, updateReadingStatusDto: UpdateReadingStatusDto) {
    return `This action updates a #${id} readingStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} readingStatus`;
  }
}
