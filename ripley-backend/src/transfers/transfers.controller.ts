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
import { TransfersService } from './transfers.service';
import { CreateTransfersDto, UpdateTransfersDto } from './dto';

@Controller('api/transfers')
export class TransfersController {

    constructor( private transfersService: TransfersService) { }


    @Get()
    public async getAllCustomer(
        @Res() res,
    ) {
        const transfers = await this.transfersService.findAll();
        return res.status(HttpStatus.OK).json(transfers);
    }


    @Post()
    public async addCustomer(
        @Res() res,
        @Body() createTransfersDto: CreateTransfersDto,
    ) {
        try {
            createTransfersDto.date = new Date();
            const customer = await this.transfersService.create(createTransfersDto);
            let transfer:any = await this.transfersService.findOne(customer._id);
            
            this.transfersService.sendEmail(transfer.recipient.email,createTransfersDto.amount)


            return res.status(HttpStatus.OK).json({
                message: 'Transfer has been created successfully',
                customer,
            });
        } catch (err) {
            console.log(err)
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Transfer not created!',
                status: 400,
            });
        }
    }


}
