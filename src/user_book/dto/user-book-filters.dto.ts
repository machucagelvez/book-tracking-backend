import { IsIn, IsOptional, IsPositive } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class UserBookFiltersDto extends PaginationDto {
  @IsOptional()
  @IsIn(['pending', 'reading', 'completed', 'dropped'])
  reading_status?: string;
}
