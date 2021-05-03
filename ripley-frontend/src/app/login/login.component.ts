import { Component, OnInit } from '@angular/core';
 
import { UserService } from '../api/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = '';
  password = '';
  public loginInvalid = false;
  title:string = 'Ingreso al sistema';
  inLogin:boolean = true;
  redirect: string = '';
  loginForm = this.formBuilder.group({
    username: ['', !this.inLogin? Validators.required:null],
    email: ['', Validators.email],
    password: ['', Validators.required]
  });
  constructor(private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar,private user:UserService) { }
 

  ngOnInit(): void {
    this.redirect =  this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('this.redirect',this.redirect)
  }
change(){
  this.inLogin = !this.inLogin;
  if (this.inLogin==false){
    this.title = 'Registre sus datos'
  }else{
    this.title = 'Ingreso al sistema'
  }
}
 async login(){
   if (this.loginForm.valid){
    try {
     let result:any = await this.user.login(this.loginForm.value).toPromise()
     this.user.setToken(result.token,result.expiresIn);
     this._snackBar.open('Datos correctos, Bienvenido', 'Ok', { verticalPosition: 'top', });
     this.router.navigateByUrl(this.redirect);
    } catch (error) {
      console.log('error',error)
      this._snackBar.open('Sin permisos o datos incorrectos', 'Ok', { verticalPosition: 'top', });
    }
   }
    else{
      this._snackBar.open('Ingrese datos correctos', 'Ok', { verticalPosition: 'top', });
    }
  }
  async signup(){
    if (this.loginForm.valid){
    try {
      let result:any = await this.user.signup(this.loginForm.value).toPromise()
     this.user.setToken(result.token,result.expiresIn);
     this._snackBar.open('Usuario Registrado, Bienvenido', 'Ok', { verticalPosition: 'top', });
     this.router.navigateByUrl(this.redirect);
    } catch (error) {
      console.log('error',error)
      this._snackBar.open('Sin permisos o datos incorrectos', 'Ok', { verticalPosition: 'top', });
    }
  }
  else{
    this._snackBar.open('Ingrese datos correctos', 'Ok', { verticalPosition: 'top', });
  }
  }

}
