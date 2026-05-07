import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  synopsis?: string;
}
