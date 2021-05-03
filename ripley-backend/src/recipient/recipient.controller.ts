import {
  Controller,
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
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecipientService } from './recipient.service';
import { CreateRecipientDto, UpdateRecipientDto } from './dto';

@Controller('api/recipient')
export class RecipientController {
  constructor(private recipientService: RecipientService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async getAll(@Res() res) {
    const Recipien = await this.recipientService.findAll();
    return res.status(HttpStatus.OK).json(Recipien);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async addRecipien(
    @Res() res,
    @Body() createRecipientDto: CreateRecipientDto,
  ) {
    try {
      const Recipien = await this.recipientService.create(createRecipientDto);
      return res.status(HttpStatus.OK).json({
        message: 'Recipient has been created successfully',
        Recipien,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Recipient not created!',
        status: 400,
      });
    }
  }
}
