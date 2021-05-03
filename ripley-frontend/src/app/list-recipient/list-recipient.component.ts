import { Component, OnInit } from '@angular/core';
import { RecipientService } from '../api/recipient.service';
import { BanksService } from '../api/banks.service';
@Component({
  selector: 'app-list-recipient',
  templateUrl: './list-recipient.component.html',
  styleUrls: ['./list-recipient.component.scss']
})
export class ListRecipientComponent implements OnInit {
  data:any = [];
  loading:boolean = false;
  displayedColumns: string[] = ['rut','name','bank','number','email','phone'];
  banks: any = [];
  constructor(private banksService: BanksService,private recipient:RecipientService) { }

  async ngOnInit() {
    this.loading = true;
    let banks: any = await this.banksService.getBanks();
    this.banks = banks.banks;
    this.data = await this.recipient.getAll();
    for (let index = 0; index < this.data.length; index++) {
      for (let index2 = 0; index2 < this.banks.length; index2++) {
        if (this.banks[index2].id==this.data[index].bank){
         this.data[index].bank = this.banks[index2].name
        }
        
      }
     
   }

    this.loading = false;
  }

}
