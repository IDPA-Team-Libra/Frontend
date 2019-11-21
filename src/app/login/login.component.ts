import { Component, OnInit } from '@angular/core';
import { CoreService } from "../api/core.service";
import { User } from "../api/user";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private coreService: CoreService, private cookieService: CookieService) { }

  ngOnInit() {

  }

  loginUser() {
    var user = new User(this.username, this.password, "");
    this.coreService.loginUser(user).toPromise().then((data: any) => {
      var dat = data;
      console.log(dat);
      if (dat != undefined) {
        var message = dat.response;
        console.log(message);
        if (message == "Success") {
          var tokenName = dat.tokenName;
          var token = dat.token;
          var expires = dat.expires;
          this.cookieService.set(tokenName, token, expires);
          this.cookieService.set("user", dat.user);
          this.cookieService.set("authenticated", "true");
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
