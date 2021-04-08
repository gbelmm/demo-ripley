import { Component, OnInit } from '@angular/core';
import { TransfersService } from '../api/transfers.service';


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
  constructor(private transfersService:TransfersService) { }

  async ngOnInit() {
   this.dataSource = await this.transfersService.getAll();
  }

}
