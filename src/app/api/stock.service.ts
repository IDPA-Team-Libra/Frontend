import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from "./stock";
import { pako } from "pako";
import { element } from 'protractor';
@Injectable({
  providedIn: 'root'
})

export class StockService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient) { }

  public loadStockdData() {
    var data = this.httpClient.get(this.apiURL + "stock/all").toPromise();
    return data;
  }

  public filter_stocks(stock) {
    return false;
  }
}
