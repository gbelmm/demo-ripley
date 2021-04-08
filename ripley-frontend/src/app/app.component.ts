import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ripleyFront';
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'home',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      link:'/'
    },
    {
      label: 'Nuevo Destinatario',
      icon: 'person_add',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      link:'/new-recipient'
    },
    {
      label: 'Transferir',
      icon: 'attach_money',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      link:'/new-transfers'
    },
    {
      label: 'Historial',
      icon: 'history',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      link:'/transfers'
    }, 
  ];
  constructor(private router: Router){}

  navigateMenu(link:string){
      console.log(link)
         this.router.navigate([link]);
        
  }
}
