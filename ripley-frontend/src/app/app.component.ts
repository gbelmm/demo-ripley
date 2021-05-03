import { Component } from '@angular/core';
import { Router ,NavigationEnd} from '@angular/router';
import { UserService } from './api/user.service';
import { MenuItem } from './menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ripleyFront';
  isLogin:boolean=false;
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
      label: 'Listado Destinatario',
      icon: 'list',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      link:'/list-recipient'
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
    } 
  ];
  menuItemsLogin: MenuItem[] = [
  ]
  constructor(private router: Router,private user:UserService){

    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
      this.isLogin = user.isLoggedIn();
      if (this.isLogin==false){
        this.menuItemsLogin = [
          {
            label:  'Ingresar',
            icon: 'login',
            showOnMobile: false,
            showOnTablet: true,
            showOnDesktop: true,
            link:'/login'
          }
        ]
      }else{
        this.menuItemsLogin = [
          {
            label:  'Salir',
            icon: 'logout',
            showOnMobile: false,
            showOnTablet: true,
            showOnDesktop: true,
            link:'/logout'
          }
        ]
      }
      console.log('this.isLogin',this.isLogin)
      }
    });
  }

  navigateMenu(link:string){
      console.log(link)
      if (link=='/logout'){
        this.user.logout();
        this.user.checkTokenExists();
        this.menuItemsLogin = [
          {
            label:  'Ingresar',
            icon: 'login',
            showOnMobile: false,
            showOnTablet: true,
            showOnDesktop: true,
            link:'/login'
          }
        ]
        this.router.navigate(['/login']);
      
      }else{
         this.router.navigate([link]);
      }
        
  }
}
