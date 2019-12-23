import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AuthenticationService } from "../auth/authentication.service";
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private cookieService: CookieService) { }

  async canActivate() {
    var status = this.authService.isAuthenticated();
    var isAuthed = await this.authService.authenticateUser();
   	if (status == true && isAuthed) {
      return true
    }
    this.cookieService.set("error","Bitte loggen Sie sich für diese Aktion ein");
    window.location.href = "/"
    return false
  }
}
