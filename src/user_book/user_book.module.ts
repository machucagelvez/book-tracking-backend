import { Module } from '@nestjs/common';
import { UserBookService } from './user_book.service';
import { UserBookController } from './user_book.controller';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService],
})
export class UserBookModule {}
