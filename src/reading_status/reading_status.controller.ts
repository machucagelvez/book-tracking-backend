import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadingStatusService } from './reading_status.service';
import { CreateReadingStatusDto } from './dto/create-reading_status.dto';
import { UpdateReadingStatusDto } from './dto/update-reading_status.dto';

@Controller('reading-status')
export class ReadingStatusController {
  constructor(private readonly readingStatusService: ReadingStatusService) {}

  @Post()
  create(@Body() createReadingStatusDto: CreateReadingStatusDto) {
    return this.readingStatusService.create(createReadingStatusDto);
  }

  @Get()
  findAll() {
    return this.readingStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingStatusDto: UpdateReadingStatusDto) {
    return this.readingStatusService.update(+id, updateReadingStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingStatusService.remove(+id);
  }
}
