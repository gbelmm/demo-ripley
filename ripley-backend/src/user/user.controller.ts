import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/user')
export class UserController {
  constructor(private userServide: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAllCustomer(@Res() res) {
    const transfers = await this.userServide.findAll();
    return res.status(HttpStatus.OK).json(transfers);
  }
}
