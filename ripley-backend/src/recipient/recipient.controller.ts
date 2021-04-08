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
import { RecipientService } from './recipient.service';
import { CreateRecipientDto, UpdateRecipientDto } from './dto';


@Controller('api/recipient')
export class RecipientController {
    constructor(private recipientService: RecipientService) { }


    @Get()
    public async getAllCustomer(
        @Res() res,
    ) {
        const customers = await this.recipientService.findAll();
        return res.status(HttpStatus.OK).json(customers);
    }


    @Post()
    public async addCustomer(
        @Res() res,
        @Body() createRecipientDto: CreateRecipientDto,
    ) {
        try {
           
            const customer = await this.recipientService.create(createRecipientDto);
            return res.status(HttpStatus.OK).json({
                message: 'Recipient has been created successfully',
                customer,
            });
        } catch (err) {
            
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Recipient not created!',
                status: 400,
            });
        }
    }

}
