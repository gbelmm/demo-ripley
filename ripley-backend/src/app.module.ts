import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipientModule } from './recipient/recipient.module';
import { TransfersModule } from './transfers/transfers.module';
import { BanksService } from './banks/banks.service';
import { BanksController } from './banks/banks.controller';
import { BanksModule } from './banks/banks.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
MongooseModule
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/ripleyApp2021'), RecipientModule, TransfersModule, BanksModule,HttpModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '../ripley-frontend/dist/ripleyFront/'),
    exclude: ['/api*'],
  }),
],
  controllers: [AppController, BanksController],
  providers: [AppService, BanksService],
})
export class AppModule {
 

}
