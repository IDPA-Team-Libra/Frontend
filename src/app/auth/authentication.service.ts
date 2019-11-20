import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public isAuthenticated() {
    return true;
  }
}
