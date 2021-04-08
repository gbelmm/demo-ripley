import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransfersService {

  configUrl:string=environment.url;
  constructor(private http: HttpClient) { }

  async getAll(){
    return this.http.get(this.configUrl+'/transfers').toPromise();
  }
  async save(data:any){
    return this.http.post(this.configUrl+'/transfers',data).toPromise();
  }
}
