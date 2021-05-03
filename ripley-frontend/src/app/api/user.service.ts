import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  configUrl:string=environment.url;
  authState  =  new  BehaviorSubject(false);
  constructor(private _snackBar: MatSnackBar,private httpClient: HttpClient) { 

    this.checkTokenExists();
    
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
 
    return throwError(errorMessage);
  }

  public getUsers() {
    return this.httpClient.get(this.configUrl+'/users', {withCredentials: true}).pipe(catchError(this.handleError));
  }
  public login(data){
    const httpOptions = {
       
    };
    return this.httpClient.post(this.configUrl+'/auth', data, httpOptions).pipe(catchError(this.handleError));
  }
  public signup(data){
    const httpOptions = {
       
    };
    return this.httpClient.put(this.configUrl+'/auth', data, httpOptions).pipe(catchError(this.handleError));
  }
  public save(data){
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json' 
      })
    };
    return this.httpClient.post(this.configUrl+'/users', data, httpOptions).pipe(catchError(this.handleError));
  }
  setWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }
  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
  setToken(token,time){
    this.setWithExpiry('ACCESS_TOKEN',token,time)
    //localStorage.setItem('ACCESS_TOKEN',token);
    this.authState.next(true);
  }

  getToken(){
  
    return this.getWithExpiry('ACCESS_TOKEN')
  }
   isLoggedIn() {
    return   this.authState.value;
  }
  checkTokenExists(): Promise<boolean>{
    return new Promise((resolve)=>{
     let token = this.getWithExpiry("ACCESS_TOKEN")
     if(token !== null){
      this.authState.next(true);
      resolve(true);
    }
    else
    {
      this.authState.next(false);
      resolve(false);
    }

    })
  }

  async logout(){
    await localStorage.removeItem("ACCESS_TOKEN");
    await localStorage.removeItem("EXPIRES_IN");
    await localStorage.removeItem("USER_ID");
    await localStorage.removeItem("USER_DATA");
    this.authState.next(false); 
  }
}