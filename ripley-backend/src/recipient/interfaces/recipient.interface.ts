import { Document } from 'mongoose';

export interface IRecipient extends Document {
  readonly rut: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly bank: string;
  readonly type: string;
  readonly number: string;
}