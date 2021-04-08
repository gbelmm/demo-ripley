import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanksService {
  configUrl:string=environment.url;
  constructor(private http: HttpClient) { }

  getBanks() {
    return this.http.get(this.configUrl+'/banks').toPromise();
  }

}
