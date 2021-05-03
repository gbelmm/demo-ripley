import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
