import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransfersSchema, Transfers } from './schemas/transfers.schema';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import { MailgunModule } from '@nextnm/nestjs-mailgun';

@Module({
  imports: [
    MailgunModule.forRoot({
      DOMAIN: 'xxx.cl',
      API_KEY: 'key-985da84deee378fcdx' 
    }),
    MongooseModule.forFeature([
      { name: Transfers.name, schema: TransfersSchema },
    ]),
  ],
  providers: [TransfersService],
  controllers: [TransfersController]
})
export class TransfersModule {}
