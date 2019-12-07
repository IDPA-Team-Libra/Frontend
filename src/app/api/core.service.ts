import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiURL: string = 'http://localhost:3440/';
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }


  public loginUser(user: User) {
    var userPostData = {
      username: user.username,
      password: user.password,
    }
    return this.httpClient.post(this.apiURL + "user/login", userPostData);
  }
  //TODO implement extraction of user from response
  //TODO check why Portfolio is empty
  public registerUser(user: User) {
    var userPostData = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    return this.httpClient.post(this.apiURL + "user/register", userPostData).toPromise();
  }

  public GetUserTransactions() {
    var transactions = this.cookieService.get("transactions");
    return JSON.parse(transactions);
  }

  public getUserInformation() {
    var user_json = this.cookieService.get("user");
    try {
      var user_object = JSON.parse(user_json);
      return user_object;
    } catch (error) {
      return undefined;
    }
  }
}
