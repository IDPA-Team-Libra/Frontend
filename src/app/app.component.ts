import { LogoutService } from './ut/logout.service';
import { Component } from '@angular/core';
import { NbMenuModule, NbThemeService } from '@nebular/theme';
import { NgcInitializeEvent, NgcNoCookieLawEvent, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { StockService } from "./api/stock.service";
import { AuthenticationService } from "./auth/authentication.service";
import {NotifierService} from "./notification/notifier.service";

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule
} from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(private ccService: NgcCookieConsentService, private authService: AuthenticationService, private logoutService: LogoutService, public themeService: NbThemeService, private cookieService: CookieService, private notifierService: NotifierService) { }

  logout() {
    this.logoutService.clearCookie();
  }

  ngOnInit() {
    var mode = this.cookieService.get("colorTheme");
    if (mode == "") {
      this.cookieService.set("colorTheme", "default");
      mode = "default";
    }
    this.themeService.changeTheme(mode);
    if (mode == "dark") {
      this.darkMode = true;
    }
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });
    var error_message = this.cookieService.get("error");
    if(error_message.length < 1){
        error_message = null;
    }
    console.log(error_message);
    if(error_message != null){
        this.notifierService.displayNotification(error_message,"warning","Ein Fehler ist aufgetretten");
        this.cookieService.delete("error");
    }
  }



  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  darkMode = false;
  changeColorMode() {
    var mode = ""
    if (this.darkMode == false) {
      mode = "dark";
    } else {
      mode = "default";
    }
    this.themeService.changeTheme(mode);
    this.cookieService.set("colorTheme", mode);
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isAuthed = false;
  title = 'libra-frontend';

  user_items = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: ["/profile"],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: ["<script>this.logoutService.clearCookie()</script>"],
    },
  ];

  market_items = [
    {
      title: 'Stock',
      icon: 'activity-outline',
      link: ["/market"],
    },
    {
      title: 'Predictions',
      icon: 'bar-chart-2-outline',
      link: ["/market"],
    },
  ];
  portfolio_items = [
    {
      title: 'Portfolio',
      icon: 'person-outline',
      link: ["/profile"],
    },
    {
      title: 'Statistics',
      icon: 'trending-up',
      link: ["/statistics"]
    },
  ];
}
