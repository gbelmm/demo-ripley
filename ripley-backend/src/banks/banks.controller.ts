import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';
import { BanksService } from './banks.service';

@Controller('api/banks')
export class BanksController {
  constructor(private banks: BanksService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAllCustomer() {
    const banks = await this.banks.findAll();
    return banks;
  }
}
