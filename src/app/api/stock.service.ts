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
    //TODO implement method to compress and decompress data from golang to javascript    
    var data = this.httpClient.get(this.apiURL + "stock/all").toPromise();
    var stock_set = [];
    data.then((dat: any) => {
      if (dat != undefined) {
        dat["stocks"].forEach(element => {
          var company = element["company"];
          var price = element["price"];
          var symbol = element["symbol"];
          var data = element["data"];
          stock_set.push(new Stock(symbol, price, data, company));
        });
      }
    }).catch(err => {
      console.log(err);
    });
    return stock_set;
  }
}
