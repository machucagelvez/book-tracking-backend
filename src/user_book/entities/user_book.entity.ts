import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from '../../book/entities/book.entity';
import { User } from '../../user/entities/user.entity';
import { ReadingStatus } from '../../reading_status/entities/reading_status.entity';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { nullable: true })
  startDate: string;

  @Column('varchar', { nullable: true })
  endDate: string;

  @Column('int', { nullable: true })
  rating: number;

  @Column('text', { nullable: true })
  notes: string;

  @Column('text', { nullable: true })
  review: string;

  @Column('boolean', { default: false })
  isFavorite: boolean;

  @Column('varchar', { nullable: true })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Book, (book) => book.userBook, { eager: true })
  book: Book;

  @ManyToOne(() => User, (user) => user.userBook)
  user: User;

  @ManyToOne(() => ReadingStatus, (readingStatus) => readingStatus.userBook, {
    eager: true,
  })
  readingStatus: ReadingStatus;
}
