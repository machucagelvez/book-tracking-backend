import { PartialType } from '@nestjs/mapped-types';
import { CreateReadingStatusDto } from './create-reading_status.dto';

export class UpdateReadingStatusDto extends PartialType(CreateReadingStatusDto) {}
