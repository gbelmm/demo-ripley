import { Document } from 'mongoose';

export interface ITransfers extends Document {
  readonly date: Date;
  readonly amount: Number;
  readonly recipient: string; 
}