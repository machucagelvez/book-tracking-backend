import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUserBookDto {
  @IsInt()
  @IsPositive()
  bookId: number;

  @IsUUID()
  userId: string;

  @IsInt()
  @IsPositive()
  readingStatusId: number;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate: string;

  @IsInt()
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  review: string;

  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
