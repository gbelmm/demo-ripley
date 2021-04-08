import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../api/transfers.service';
import { BanksService } from '../api/banks.service';

export interface Trasnfers {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Trasnfers[] = [
 
];



@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  displayedColumns: string[] = ['name','rut','bank','type','amount','date'];
  dataSource:any = ELEMENT_DATA;
  banks: any = [];
  loading: boolean = false;
  constructor(private banksService: BanksService,private transfersService:TransfersService) { }

  async ngOnInit() {
    this.loading = true;
  
   let banks: any = await this.banksService.getBanks();
  
    this.banks = banks.banks;
    this.dataSource = await this.transfersService.getAll();
    for (let index = 0; index < this.dataSource.length; index++) {
       for (let index2 = 0; index2 < this.banks.length; index2++) {
         if (this.banks[index2].id==this.dataSource[index].recipient.bank){
          this.dataSource[index].recipient.bank = this.banks[index2].name
         }
         
       }
      
    }
    this.loading = false;
  }

}
