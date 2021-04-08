import { PartialType } from '@nestjs/mapped-types';
import { CreateTransfersDto } from './create-transfers.dto';

export class UpdateTransfersDto extends PartialType(CreateTransfersDto) {}