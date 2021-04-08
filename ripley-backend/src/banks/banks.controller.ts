import { Controller } from '@nestjs/common';
import {
 
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    NotFoundException,
    Delete,
    Param,
    Query,
  } from '@nestjs/common';
import { BanksService } from './banks.service';


@Controller('api/banks')
export class BanksController {
    constructor(private banks: BanksService) {}

    @Get()
    public async getAllCustomer(
      
    ) {
      const banks = await this.banks.findAll();
      return banks;
    }
}
