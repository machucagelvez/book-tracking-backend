import { IsIn } from 'class-validator';

export class CreateReadingStatusDto {
  @IsIn(['pending', 'reading', 'completed', 'dropped'])
  name: string;
}
