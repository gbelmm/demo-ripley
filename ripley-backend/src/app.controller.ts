import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {    HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
 
@Controller()
export class AppController {
  constructor(private readonly http: HttpService,private readonly appService: AppService) {}

   
}
