import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService) {

  }
  public getUsername() {
    var user = this.cookieService.get("user");
    var obj = JSON.parse(user);
    return obj.username;
  }

 

  public getAuthToken() {
    return this.cookieService.get("auth_token");
  }
}
