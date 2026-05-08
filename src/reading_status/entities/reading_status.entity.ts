import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBook } from '../../user_book/entities/user_book.entity';

@Entity()
export class ReadingStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => UserBook, (userBook) => userBook.readingStatus)
  userBook: UserBook[];
}
