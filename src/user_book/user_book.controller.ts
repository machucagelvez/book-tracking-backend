import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserBookService } from './user_book.service';
import { CreateUserBookDto } from './dto/create-user_book.dto';
import { UpdateUserBookDto } from './dto/update-user_book.dto';
import { UserBookFiltersDto } from './dto/user-book-filters.dto';

@Controller('user-book')
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Post()
  create(@Body() createUserBookDto: CreateUserBookDto) {
    return this.userBookService.create(createUserBookDto);
  }

  @Get()
  findByStatus(@Query() userBookFiltersDto: UserBookFiltersDto) {
    return this.userBookService.findByStatus(userBookFiltersDto);
  }

  @Get('summary')
  getSummary() {
    return this.userBookService.getSummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserBookDto: UpdateUserBookDto,
  ) {
    return this.userBookService.update(+id, updateUserBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBookService.remove(+id);
  }
}
