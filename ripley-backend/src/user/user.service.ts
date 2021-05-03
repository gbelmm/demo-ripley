import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Users } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly usersModel: Model<Users>,
  ) {}

  public async findAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
  }
  public async findOne(email: string): Promise<Users> {
    return await this.usersModel.findOne({ email: email });
  }
  public async create(createUser: CreateUserDto): Promise<IUser> {
    const isNew: any = await this.usersModel.findOne({
      email: createUser.email,
    });
    if (isNew == null) {
      const user = await new this.usersModel(createUser);
      return user.save();
    } else {
      return null;
    }
  }
}
