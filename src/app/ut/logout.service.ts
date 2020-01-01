import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private cookieService: CookieService, @Inject(SESSION_STORAGE) private storageService: StorageService) { }
  //TODO do not clear all cookies, but only the ones that we no longer need for the user
  clearCookie() {
    var color = this.cookieService.get("colorTheme");
    var cookie_consent = this.cookieService.get("cookieconsent_status");
    this.cookieService.deleteAll();
    this.cookieService.set("colorTheme", color);
    this.cookieService.set("cookieconsent_status", cookie_consent);
    window.location.href = "/"
    this.storageService.clear();
  }
}
