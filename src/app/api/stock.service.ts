import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CookieService } from "ngx-cookie-service";
import { LZStringService } from 'ng-lz-string';
@Injectable({
  providedIn: 'root'
})

export class StockService {
  apiURL: string = environment.api_url;

  constructor(private httpClient: HttpClient, @Inject(SESSION_STORAGE) private storageService: StorageService, private compressionService: LZStringService, private cookieService: CookieService) {
    if (this.cookieService.get("stock_data_state") != "empty" || this.cookieService.get("stock_data_state") != "read") {
      this.cookieService.set("stock_data_state", "empty");
    }
  }

  public setState(data) {
    this.cookieService.set("stock_data_state", "read");
    this.storageService.set("stock_data", this.compressionService.compress(data));
  }
  public purgeState() {
    this.cookieService.set("stock_data_state", "empty");
  }

  public getData() {
    return this.compressionService.decompress(this.storageService.get("stock_data"));
  }

  public getState() {
    return this.cookieService.get("stock_data_state");
  }

  public loadStockdData() {
    var data = this.httpClient.get(this.apiURL + "stock/all").toPromise();
    return data;
  }
}
