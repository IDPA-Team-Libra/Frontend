import { NotifierService } from './../notification/notifier.service';
import { Component, OnInit } from '@angular/core';
import { CoreService } from "../api/core.service";
import { User } from "../api/user";
import { CookieService } from "ngx-cookie-service";
import { UserService } from './../api/user.service';
import { tickStep } from 'd3';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private coreService: CoreService, private cookieService: CookieService, private notifierService: NotifierService, private userService: UserService) { }

  ngOnInit() {

  }

  loginUser() {
    var user = new User(this.username, this.password, "");
    this.coreService.loginUser(user).toPromise().then((data: any) => {
      var dat = data;
      if (dat != undefined) {
        var message = dat.response;
        if (message == "Success") {
          var tokenName = dat.tokenName;
          var token = dat.token;
          var expires = dat.expires;
          this.cookieService.set(tokenName, token, expires);
          this.cookieService.set("user", dat.user);
          this.userService.purgeMetadata();
          this.cookieService.set("authenticated", "true");
          this.notifierService.displayNotification("Sie wurden erfolgreich eingeloggt", "success", "Login erfolgreich").onClose.subscribe(function () {
            window.location.href = "/profile"
          });
        } else {
          this.notifierService.displayNotification(message, "danger", "Registrierung Fehlgeschlagen").onClose.subscribe(function () {
          });
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
