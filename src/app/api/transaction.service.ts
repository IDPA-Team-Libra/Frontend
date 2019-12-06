import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient, private userService: UserService) { }

  public sendTransaction(transaction) {
    transaction = this.buildRequestBody(transaction);
    var transactionRequestBody = this.convertTransaction(transaction, "buy");
    var response = this.httpClient.post(this.apiURL + "transaction/buy", transactionRequestBody).toPromise();
    return response;
  }

  private buildRequestBody(transaction) {
    var username = this.userService.getUsername();
    var token = this.userService.getAuthToken();
    transaction.username = username;
    transaction.userAuthKey = token;
    return transaction
  }

  private convertTransaction(transaction, operation) {
    const transactionBody = {
      operation: operation,
      username: transaction.username,
      authToken: transaction.userAuthKey,
      stockSymbol: transaction.stockSymbol,
      stockName: transaction.stockName,
      expectedStockPrice: transaction.expectedStockPrice,
      amount: transaction.amount,
    };
    return transactionBody;
  }
}
