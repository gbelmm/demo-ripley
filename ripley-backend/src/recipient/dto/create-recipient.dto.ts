import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateRecipientDto {
  @IsString() 
  @IsNotEmpty()
  readonly rut: string;

  @IsString() 
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString() 
  @IsNotEmpty()
  readonly phone: string;

  @IsString() 
  @IsNotEmpty()
  readonly bank: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsString()
  @IsNotEmpty()
  readonly number: string
}