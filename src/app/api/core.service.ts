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
    }
    this.httpClient.post(this.apiURL + "user/register", userPostData).toPromise()
      .then((data: any) => {
        var dat = data;
        if (dat != undefined) {
          var message = dat.response;
          if (message == "Success") {
            var tokenName = dat.tokenName;
            var token = dat.token;
            var expires = dat.expires;
            var user = dat.user;
            this.cookieService.set(tokenName, token, expires);
            this.cookieService.set("user", user);
            this.cookieService.set("authenticated", "true");
          }else{
            return message;
          }
        }
      }).catch(err => {
        return false;
      });
    return true;
  }


  public getUserInformation() {
    var user_json = this.cookieService.get("user");
    console.log(user_json);
    try {
      var user_object = JSON.parse(user_json);
      return user_object;
    } catch (error) {
      return undefined;
    }
  }
}
