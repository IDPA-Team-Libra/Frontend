import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiURL: string = environment.api_url;
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  public sendBuyTransaction(transaction) {
    transaction = this.buildRequestBody(transaction);
    var transactionRequestBody = this.convertTransaction(transaction, "buy");
    return this.sendTransactionToServer(transactionRequestBody, "transaction/buy");
  }

  public sendTransactionToServer(transactionObject, location) {
    var response = this.httpClient.post(this.apiURL + location, transactionObject).toPromise();
    return response;
  }

  public sendDelayedBuyTransaction(transaction) {
    transaction = this.buildRequestBody(transaction);
    var transactionRequestBody = this.convertTransaction(transaction, "buy");
    return this.sendTransactionToServer(transactionRequestBody, "transaction/buy/delayed");
  }

  public sendDelayedSellTransaction(transaction) {
    transaction = this.buildRequestBody(transaction);
    var transactionRequestBody = this.convertTransaction(transaction, "sell");
    return this.sendTransactionToServer(transactionRequestBody, "transaction/sell/delayed");
  }
  
  private buildRequestBody(transaction) {
    var username = this.userService.getUsername();
    var token = this.userService.getAuthToken();
    transaction.username = username;
    transaction.userAuthKey = token;
    return transaction
  }

  public sendSellTransaction(transaction) {
    transaction = this.buildRequestBody(transaction);
    var transactionRequestBody = this.convertTransaction(transaction, "sell");
    return this.sendTransactionToServer(transactionRequestBody, "transaction/sell");
  }

  private convertTransaction(transaction, operation) {
    var transactionBody = {
      operation: operation,
      username: transaction.username,
      authToken: transaction.userAuthKey,
      stockSymbol: transaction.stockSymbol,
      stockName: transaction.stockName,
      expectedStockPrice: transaction.expectedStockPrice,
      amount: transaction.amount,
    };
    if (transaction.date != null) {
      var date = transaction.date;
      var strDate = 'Y-m-d'
        .replace('Y', date.getFullYear())
        .replace('m', date.getMonth() + 1)
        .replace('d', date.getDate());
      transactionBody["date"] = strDate;
    }
    return transactionBody;
  }
}
