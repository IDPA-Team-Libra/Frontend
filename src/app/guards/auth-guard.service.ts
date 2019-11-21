import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AuthenticationService } from "../auth/authentication.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate() {
    var status = this.authService.isAuthenticated();
    if (status == true) {
      return true
    }
    window.location.href = "/"
    return false
  }
}
