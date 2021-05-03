import { Injectable, HttpService } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class BanksService {
  constructor(private readonly http: HttpService) {}
  public async findAll() {
    const response = await this.http
      .get('https://bast.dev/api/banks.php')
      .toPromise();
    return response.data;
  }
}
