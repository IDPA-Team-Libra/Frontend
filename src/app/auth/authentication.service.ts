import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private cookieService: CookieService) { }
  //TODO implement a proper method of validating the user
  public isAuthenticated() {
    var authenticated = this.cookieService.get("authenticated");
    if (authenticated == "true") {
      return true;
    }
    return false;
  }
}
