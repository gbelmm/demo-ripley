import { Component, OnInit } from '@angular/core';
import { BanksService } from '../api/banks.service';
import * as Rut from 'rutjs';
import { RecipientService } from '../api/recipient.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-recipient',
  templateUrl: './new-recipient.component.html',
  styleUrls: ['./new-recipient.component.scss']
})
export class NewRecipientComponent implements OnInit {
  banks: any = [];
  loading: boolean = false;
  types: any = [{ name: 'Cuenta Corriente' }, { name: 'Cuenta Vista' }, { name: 'Chequera Electrónica' }, { name: 'Cuenta Ahorro' }]
  recipient: any = { rut: '', name: '', email: '', phone: '', type: '', number: '' };
  rutValido: boolean = false
  constructor(private _snackBar: MatSnackBar,private banksService: BanksService,private recipientService:RecipientService) { }

  clear(){
    this.recipient={ rut: '', name: '', email: '', phone: '', type: '', number: '' };
  }
  async ngOnInit() {
    this.loading = true;
    let banks: any = await this.banksService.getBanks();
    this.loading = false;
    this.banks = banks.banks;
   
  }
  checkRut() {
    if (this.recipient.rut != '') {
      let rut = new Rut(this.recipient.rut);
      console.log('rut.isValid', rut.isValid)
      console.log(rut.getNiceRut());
      this.recipient.rut = rut.getNiceRut();

      if (this.recipient.rut.length > 8) {
        this.rutValido = rut.isValid
        if (rut.isValid === true) {

        }
      } else {
        this.rutValido = false;
      }
    } else {
      this.rutValido = false;
    }

  }

  async save() {
    if (this.recipient.rut==''){
      this.alert('Debe ingresar un Rut');
      return;
    }
    if (this.rutValido==false){
      this.alert('Debe ingresar un Rut valido');
      return;
    }
    if (this.recipient.name==''){
      this.alert('Debe ingresar un Nombre');
      return;
    }
    if (this.recipient.email=='' || this.recipient.email==null){
      this.alert('Debe ingresar un Email Valido');
      return;
    }
    if (this.recipient.phone==''){
      this.alert('Debe ingresar un telefono');
      return;
    }
    if (this.recipient.bank==''){
      this.alert('Debe seleccionar un Banco');
      return;
    }
    if (this.recipient.type==''){
      this.alert('Debe seleccionar un tipo de cuenta de Banco');
      return;
    }
    if (this.recipient.number==''){
      this.alert('Debe Ingresar el número de cuenta del Banco');
      return;
    }
    this.alert('Guardando Datos');
    this.loading = true;
    await this.recipientService.save(this.recipient);
    this.clear();
    this.loading = false;
    this.alert('Datos Guardados Correctamente');
  }
  alert(msg:any){
    this._snackBar.open(msg, '', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
