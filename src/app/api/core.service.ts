import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./user";
import { CookieService } from "ngx-cookie-service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  apiURL: string = environment.api_url;
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
  public registerUser(user: User, account_balance) {
    var userPostData = {
      username: user.username,
      password: user.password,
      email: user.email,
      startBalance: account_balance,
    };
    return this.httpClient.post(this.apiURL + "user/register", userPostData).toPromise();
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
