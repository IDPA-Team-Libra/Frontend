import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from "./stock";
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})

//TODO add localstorage and store market info for a time.
export class StockService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient) { }
  receivedData = undefined;

  public setData(data) {
    this.receivedData = data;
  }

  public loadStockdData() {
    var data;
    if (this.receivedData == undefined) {
      data = this.httpClient.get(this.apiURL + "stock/all").toPromise();
      this.receivedData = data;
    } else {
      data = this.receivedData;
    }
    return data;
  }

  public filter_stocks(stock) {
    return false;
  }
}
