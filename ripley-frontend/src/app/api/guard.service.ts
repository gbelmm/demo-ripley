import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router,  } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private _snackBar: MatSnackBar,private router: Router,private authService: UserService){}

  canActivate(
     
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.isLoggedIn())
      if (this.authService.isLoggedIn()==false){
        this._snackBar.open('Sin permisos, por favor ingrese sus credenciales', 'Ok', {
        
          verticalPosition: 'top',
        });
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }
 
    return   this.authService.isLoggedIn();
  }
  
}
