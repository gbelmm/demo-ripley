import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewRecipientComponent } from './new-recipient/new-recipient.component';
import { NewTransfersComponent } from './new-transfers/new-transfers.component';
import { TransfersComponent } from './transfers/transfers.component';
import { GuardGuard } from './api/guard.service';
import { LoginComponent } from './login/login.component';
import { ListRecipientComponent } from './list-recipient/list-recipient.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'new-recipient', component: NewRecipientComponent,canActivate:[GuardGuard] }, 
  { path: 'new-transfers', component: NewTransfersComponent,canActivate:[GuardGuard] }, 
  { path: 'transfers', component: TransfersComponent,canActivate:[GuardGuard] }, 
  { path: 'list-recipient', component: ListRecipientComponent,canActivate:[GuardGuard] }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
