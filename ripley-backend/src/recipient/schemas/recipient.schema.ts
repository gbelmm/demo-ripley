import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Recipient extends Document {
  @Prop()
  rut: string;

  @Prop()
  name: string;

  @Prop()
  email: string;  

  @Prop()
  phone: string;  

  @Prop()
  bank: string;

  @Prop()
  type: string;  

  @Prop()
  number: string;  
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);