import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(loginAttempt: LoginUserDto) {
    const userToAttempt = await this.usersService.create(loginAttempt);
    console.log('userToAttempt',userToAttempt)
    if (userToAttempt) return this.createJwtPayload(userToAttempt);
    else {
      throw new UnauthorizedException();
    }
  }
  async validateUserByPassword(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    const userToAttempt = await this.usersService.findOne(loginAttempt.email);

    return new Promise((resolve) => {
      // Check the supplied password against the hash stored for this email address
      if (userToAttempt && userToAttempt.password === loginAttempt.password) {
        resolve(this.createJwtPayload(userToAttempt));
      } else {
        throw new UnauthorizedException();
      }
    });
  }

  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOne(payload.email);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    const data: JwtPayload = {
      email: user.email,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 36000000,
      token: jwt,
    };
  }
}
