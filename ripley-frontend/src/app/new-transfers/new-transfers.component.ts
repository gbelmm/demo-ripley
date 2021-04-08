import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RecipientService } from '../api/recipient.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BanksService } from '../api/banks.service';
import { TransfersService } from '../api/transfers.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


export interface RecipientModel {
  name: string;
  _id: string
}

@Component({
  selector: 'app-new-transfers',
  templateUrl: './new-transfers.component.html',
  styleUrls: ['./new-transfers.component.scss']
})
export class NewTransfersComponent implements OnInit {
  myControl = new FormControl();
  recipiens: any = [];
  recipiensSelected: any = { amount: 0, recipient: '', rut: '', name: '', email: '', phone: '', type: '', number: '' };
  recipientid: any = '';
  filteredOptions: Observable<RecipientModel[]> | undefined;
  banks: any = [];
  loading: boolean = false;
  types: any = [{ name: 'Cuenta Corriente' }, { name: 'Cuenta Vista' }, { name: 'Chequera Electrónica' }, { name: 'Cuenta Ahorro' }]
  recipient: any = { rut: '', name: '', email: '', phone: '', type: '', number: '' };
  rutValido: boolean = false
  createNew: boolean = false;
  constructor(private _snackBar: MatSnackBar,private banksService: BanksService, private recipientService: RecipientService,private trasnfersService:TransfersService) { }

  reset(){
    this.recipientid = '';
    this.recipiensSelected = { amount: 0, recipient: '', rut: '', name: '', email: '', phone: '', type: '', number: '' };
  }
  async ngOnInit() {

    this.loading = true;
    this.recipiens = await this.recipientService.getAll();
    if (this.recipiens.length == 0) {
      this.createNew = true;
    }
    let banks: any = await this.banksService.getBanks()
    this.banks = banks.banks;
    this.loading = false;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.recipiens.slice())
      );

  }
  displayFn(user: RecipientModel): string {

    return user && user._id ? user._id : '';
  }
  _filter(id: string) {
    const filterValue = id.toLowerCase();
    let filter = this.recipiens.filter((option: any) => option._id.toLowerCase().indexOf(filterValue) === 0);
    console.log('filter[0];', filter[0])
    this.recipiensSelected = filter[0];
   
    this.recipiensSelected.recipient = filter[0]._id;
    this.recipiensSelected.amount = 0;
  
    setTimeout(() => {
      this.recipientid = ''
    }, 300);

    return this.recipiens.filter((option: any) => option._id.toLowerCase().indexOf(filterValue) === 0);
  }
  selectRecipient() {
    console.log(this.recipientid)
  }
  save(){
    delete this.recipiensSelected._id
    if ((this.recipiensSelected.recipient)=='' || this.recipiensSelected.recipient==null){
      this.alert('Debe seleccionar un destinatario');
      return;
    }
    if (isNaN(this.recipiensSelected.amount)==true){
      this.alert('Debe ingresar un monto  correcto');
      return;
    }
    if ((this.recipiensSelected.amount)<=0){
      this.alert('Debe ingresar un monto mayor que 0');
      return;
    }
    this.loading = true;
    this.trasnfersService.save(this.recipiensSelected);
    this.alert('Transferencia Guardada correctamente');
    this.loading = false;
    this.reset();
  }
  alert(msg:any){
    this._snackBar.open(msg, '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
