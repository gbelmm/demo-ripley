import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipientSchema, Recipient } from './schemas/recipient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema },
    ]),
  ],
  providers: [RecipientService],
  controllers: [RecipientController]
})
export class RecipientModule {}
