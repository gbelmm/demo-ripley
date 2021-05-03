import { Controller, Post, Body,Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }

  @Put()
  async signup(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.register(loginUserDto);
  }
}
