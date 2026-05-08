import { Module } from '@nestjs/common';
import { UserBookService } from './user_book.service';
import { UserBookController } from './user_book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from './entities/user_book.entity';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [UserBookController],
  providers: [UserBookService],
  imports: [TypeOrmModule.forFeature([UserBook]), CommonModule, UserModule],
})
export class UserBookModule {}
