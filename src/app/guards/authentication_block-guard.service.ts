import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { AuthenticationService } from "../auth/authentication.service";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})
export class AuthenticationBlockGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private cookieService: CookieService) { }

    async canActivate() {
        if (this.authService.isAuthenticated() === true) {
            window.location.href = "/profile"
        }
        return true;
    }
}
