import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRecipient } from './interfaces/recipient.interface';
import { CreateRecipientDto, UpdateRecipientDto } from './dto';
import { Recipient } from './schemas/recipient.schema';

@Injectable()
export class RecipientService {
  constructor(
    @InjectModel(Recipient.name)
    private readonly recipientModel: Model<Recipient>,
  ) {}

  public async findAll(): Promise<Recipient[]> {
    return await this.recipientModel.find().exec();
  }

  public async create(
    createRecipientDto: CreateRecipientDto,
  ): Promise<IRecipient> {
    const newCustomer = await new this.recipientModel(createRecipientDto);
    return newCustomer.save();
  }
}
