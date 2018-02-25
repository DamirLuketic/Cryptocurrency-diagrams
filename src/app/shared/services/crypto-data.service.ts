import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CryptoDataService {

  public cryptoData = null;

  constructor(
      private http: HttpClient
  ) { }

  getCryptoData() {
    // return this.http.get('https://www.cryptocompare.com/api/data/coinlist/');
      return this.http.get('/assets/tempData/cryptoTempData.html');
  }

  getDailyData(currency, valute, day) {
    return this.http.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + currency + '&tsyms=' + valute + '&ts=' + day);
  }
}
