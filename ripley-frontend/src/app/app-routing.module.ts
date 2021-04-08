import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewRecipientComponent } from './new-recipient/new-recipient.component';
import { NewTransfersComponent } from './new-transfers/new-transfers.component';
import { TransfersComponent } from './transfers/transfers.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'new-recipient', component: NewRecipientComponent }, 
  { path: 'new-transfers', component: NewTransfersComponent }, 
  { path: 'transfers', component: TransfersComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
