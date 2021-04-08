import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Transfers extends Document {
  @Prop()
  date: Date;

  @Prop()
  amount: Number;

  @Prop({ type: Types.ObjectId, ref: 'Recipient' })
  recipient: string 
}

export const TransfersSchema = SchemaFactory.createForClass(Transfers);