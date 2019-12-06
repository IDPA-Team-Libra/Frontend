import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from "./stock";
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})

export class StockService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient) { }
  receavedData = undefined;

  public setData(data) {
    this.receavedData = data;
  }

  public loadStockdData() {
    var data;
    if (this.receavedData == undefined) {
      data = this.httpClient.get(this.apiURL + "stock/all").toPromise();
      this.receavedData = data;
    } else {
      data = this.receavedData;
    }
    return data;
  }

  public filter_stocks(stock) {
    return false;
  }
}
