import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserBookService } from './user_book.service';
import { CreateUserBookDto } from './dto/create-user_book.dto';
import { UpdateUserBookDto } from './dto/update-user_book.dto';
import { UserBookFiltersDto } from './dto/user-book-filters.dto';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('user-book')
@UseGuards(AuthGuard())
export class UserBookController {
  constructor(private readonly userBookService: UserBookService) {}

  @Post()
  create(@Body() createUserBookDto: CreateUserBookDto) {
    return this.userBookService.create(createUserBookDto);
  }

  @Get()
  findByStatus(
    @Query() userBookFiltersDto: UserBookFiltersDto,
    @GetUser() user: User,
  ) {
    return this.userBookService.findByStatus(user, userBookFiltersDto);
  }

  @Get('summary')
  getSummary(@GetUser() user: User) {
    return this.userBookService.getSummary(user);
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
