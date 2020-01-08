import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from '@angular/common/http';
import { UserService } from "../api/user.service";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient, private userService: UserService) { }


  public isAuthenticated() {
    var authenticated = this.cookieService.get("authenticated");
    if (authenticated === "true") {
      return true;
    }
    return false;
  }

  public authenticateUser(retries) {
    var body =
    {
      username: this.userService.getUsername(),
      accessToken: this.userService.getAuthToken()
    };
    var apiURL: string = environment.api_url;
    var val = this.httpClient.post(apiURL + "authenticate/token", body).toPromise().then((val: any) => {
      try {
        if (val.response === "Invalid Token") {
          this.userService.setErrorTokenAndClear();
          return false;
        } else {
          return true;
        }
      } catch (err) {
        console.log(err);
      }
    });
    return val;
  }
}
