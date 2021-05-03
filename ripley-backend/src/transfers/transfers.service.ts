import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITransfers } from './interfaces/transfers.interface';
import { CreateTransfersDto, UpdateTransfersDto } from './dto';
import { Transfers } from './schemas/transfers.schema';
import { MailgunService } from '@nextnm/nestjs-mailgun';

@Injectable()
export class TransfersService {
  constructor(
    private mailgunService: MailgunService,
    @InjectModel(Transfers.name)
    private readonly transfersModel: Model<Transfers>,
  ) {}

  public async findAll(): Promise<Transfers[]> {
    return await this.transfersModel.find().populate('recipient').exec();
  }

  public async create(
    createTransfersDto: CreateTransfersDto,
  ): Promise<ITransfers> {
    const newCustomer = await new this.transfersModel(createTransfersDto);

    return newCustomer.save();
  }

  public async findOne(transfersId: string): Promise<Transfers> {
    const customer = await this.transfersModel
      .findById({ _id: transfersId })
      .populate('recipient')
      .exec();

    if (!customer) {
      throw new NotFoundException(`Transfers #${transfersId} not found`);
    }

    return customer;
  }
  async sendEmail(email, amount) {
    const options: any = {
      from: 'noreply@demomibanco.cl',
      to: email,
      subject: 'Nueva Transferencia ✔',
      text:
        'Ha recibido una nueva tranferencia por un monto de <b>' +
        amount +
        '<b>',
      html:
        'Ha recibido una nueva tranferencia por un monto de <b>' +
        amount +
        '<b>',
    };

    await this.mailgunService.sendEmail(options);
  }
}
