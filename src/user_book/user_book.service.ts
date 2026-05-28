import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserBookDto } from './dto/create-user_book.dto';
import { UpdateUserBookDto } from './dto/update-user_book.dto';
import { UserBook } from './entities/user_book.entity';
import { CommonService } from '../common/common.service';
import { UserService } from '../user/user.service';
import { UserBookFiltersDto } from './dto/user-book-filters.dto';

@Injectable()
export class UserBookService {
  constructor(
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,
    private readonly commonService: CommonService,
    private readonly userService: UserService,
  ) {}

  async create(createUserBookDto: CreateUserBookDto) {
    const { userId, bookId, readingStatusId, ...userBookData } =
      createUserBookDto;

    try {
      const userBook = this.userBookRepository.create({
        ...userBookData,
        user: { id: userId },
        book: { id: bookId },
        readingStatus: { id: readingStatusId },
      });
      await this.userBookRepository.save(userBook);
      return userBook;
    } catch (error) {
      this.commonService.errorHandler(error);
    }
  }

  async findByStatus(userBookFiltersDto?: UserBookFiltersDto) {
    const {
      limit = 6,
      page = 1,
      reading_status: readingStatus,
    } = userBookFiltersDto;
    const offset = (page - 1) * limit;

    const queryBuilder = this.userBookRepository
      .createQueryBuilder('userBook')
      .innerJoin('userBook.readingStatus', 'readingStatus')
      .innerJoin('userBook.book', 'book')
      .select([
        'userBook.id AS "userBookId"',
        'book.title AS "title"',
        'book.synopsis AS "synopsis"',
        'userBook.startDate AS "startDate"',
        'userBook.endDate AS "endDate"',
        'userBook.rating AS "rating"',
        'userBook.notes AS "notes"',
        'userBook.review AS "review"',
        'userBook.isFavorite AS "isFavorite"',
        'userBook.imageUrl AS "imageUrl"',
        'readingStatus.id AS "readingStatusId"',
        'readingStatus.name AS "readingStatus"',
        'userBook.createdAt AS "createdAt"',
        'userBook.updatedAt AS "updatedAt"',
      ]);

    if (readingStatus)
      queryBuilder.where('readingStatus.name = :readingStatus', {
        readingStatus,
      });

    const total = await queryBuilder.getCount();
    const pages = Math.ceil(total / limit);

    const userBooks = await queryBuilder
      .limit(limit)
      .offset(offset)
      .getRawMany();
    return { total, pages, userBooks };
  }

  getSummary() {
    const queryBuilder = this.userBookRepository
      .createQueryBuilder('userBook')
      .innerJoin('userBook.readingStatus', 'readingStatus')
      .select([
        "COUNT(*) FILTER (WHERE readingStatus.name = 'pending')   AS pending",
        "COUNT(*) FILTER (WHERE readingStatus.name = 'completed') AS completed",
        "COUNT(*) FILTER (WHERE readingStatus.name = 'reading')   AS reading",
        "COUNT(*) FILTER (WHERE readingStatus.name = 'dropped')   AS dropped",
        'COUNT(*) AS total',
      ]);
    return queryBuilder.getRawOne();
  }

  findOne(id: number) {
    return `This action returns a #${id} userBook`;
  }

  update(id: number, updateUserBookDto: UpdateUserBookDto) {
    return `This action updates a #${id} userBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBook`;
  }
}
