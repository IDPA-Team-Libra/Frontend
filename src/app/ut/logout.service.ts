import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private cookieService: CookieService) { }
  //TODO do not clear all cookies, but only the ones that we no longer need for the user
  //! clear all data, that is no longer free to be on the users computer.
  clearCookie() {
    this.cookieService.deleteAll();
  }
}
