import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from '@angular/common/http';
 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar'
import { UserService } from '../api/user.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private user: UserService,private router:Router,private _snackBar: MatSnackBar){}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.user.getToken();
    
if (!token ) {
      return next.handle(req) 
    }
const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
return next.handle(headers) 
}
   
}