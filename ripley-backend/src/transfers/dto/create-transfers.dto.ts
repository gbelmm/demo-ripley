import { MaxLength, IsNotEmpty, IsEmail, IsString,IsNumber } from 'class-validator';

export class CreateTransfersDto {
  @IsString() 
  @IsNotEmpty()
   date: Date;

  @IsNumber() 
  @IsNotEmpty()
  readonly amount: Number;

  @IsString() 
  @IsNotEmpty()
  readonly recipient: string;


}