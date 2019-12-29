import { Injectable, Inject } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LZStringService } from 'ng-lz-string';
import { LogoutService } from '../ut/logout.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(SESSION_STORAGE) private storageService: StorageService, private httpClient: HttpClient, private cookieService: CookieService, private compressionService: LZStringService, private logoutService: LogoutService) {

  }

  public getUsername() {
    var user = this.cookieService.get("user");
    if (user.length < 1) {
      return null;
    }
    var obj = JSON.parse(user);
    return obj.username;
  }


	public updateBalanceAndValue(value){
		var currentBalance = this.getUserBalance();
		var currentValue = this.getUserTotalStockValue();
		currentBalance -= value;
		currentValue += value;
		this.updateValues(currentBalance,currentValue);
	}

	updateValues(newBalance,newTotalValue){
		var user = this.cookieService.get("user");
		if (user.length < 1) {
		  return null;
		}
		var obj = JSON.parse(user);
		obj.portfolio.currentValue = newTotalValue;
		obj.portfolio.currentBalance = newBalance;
		this.cookieService.set("user",JSON.stringify(obj));
	}

	public getUserBalance(){
		var user = this.cookieService.get("user");
		if (user.length < 1) {
		  return null;
		}
		var obj = JSON.parse(user);
		console.log(obj);
		return obj.portfolio.currentBalance;
	}

	public getUserTotalStockValue(){
		var user = this.cookieService.get("user");
		if (user.length < 1) {
		  return null;
		}
		var obj = JSON.parse(user);
		return obj.portfolio.currentValue;
	}

  purging = false;

  public purgeMetadata() {
    this.reloadMetaData();
  }


  public getPortfolioItems() {
    var portfolioData = this.compressionService.decompress(this.storageService.get("portfolio"));
    var portObj;
    portObj = JSON.parse(portfolioData);
    return portObj;
  }

  reloadMetaData() {
    var body = {
      username: this.getUsername(),
      accessToken: this.getAuthToken(),
    };
    var apiURL = 'http://localhost:3440/';
    this.httpClient.post(apiURL + "portfolio/get", body).toPromise().then((val: any) => {
		console.log(val);
      if (val.message == "Invalid Token") {
        this.setErrorTokenAndClear();
      }
      this.storageService.set("portfolio", this.compressionService.compress(val.items));
      this.storageService.set("transactions", this.compressionService.compress(val.transactions));
    });
  }

  changePassword(new_password) {
    var body = {
      authToken: this.getAuthToken(),
      username: this.getUsername(),
      newPassword: new_password,
    };
    var apiURL = 'http://localhost:3440/';
    return this.httpClient.post(apiURL + "user/changePassword", body).toPromise();
  }

  setErrorTokenAndClear() {
    this.logoutService.clearCookie();
    this.cookieService.set("error", "Leider konnten sie nicht durch den Server Authentifiziert werden. Bitte loggen Sie sich erneut ein und versuchen Sie die vorherige Aktion erneut");
    window.location.href = "/"
  }


  getNews(symbol, accessToken) {
    var url = "https://newsapi.org/v2/everything?q=" + symbol + "&sortBy=popularity&apiKey=" + accessToken;
	  console.log(url);
    return this.httpClient.get(url).toPromise();
  }

  buildTransactions(val) {
    var array = [];
    for (const index in val) {
      var transaction = val[index];
      var transaction_el = { data: { action: transaction.action, date: transaction.date, value: transaction.value, description: transaction.description, totalValue: Number(transaction.amount) * Number(transaction.value), amount: transaction.amount } };
      array.push(transaction_el);
    }
    return array;
  }

  public GetUserTransactions() {
    var transactionData = this.compressionService.decompress(this.storageService.get("transactions"));
    var portObj;
    portObj = JSON.parse(transactionData);
    return this.buildTransactions(portObj);
  }

  public getAuthToken() {
    return this.cookieService.get("auth_token");
  }
}
