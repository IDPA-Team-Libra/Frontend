import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TermsComponent } from '../terms/terms.component';
import { CoreService } from "../api/core.service";
import { User } from "../api/user";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  username;
  password;
  email;

  public open(hasBackdrop: boolean) {
    const dialogRef = this.dialogService.open(TermsComponent, { hasBackdrop });
    dialogRef.onClose.subscribe(_ => this.registerUser());
  }

  openWithBackdrop() {
    this.open(true);
  }

  constructor(private dialogService: NbDialogService, private coreService: CoreService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  openDialog() {
  }

  registerUser() {
    var user = new User(this.username, this.password, this.email);
    this.coreService.registerUser(user).toPromise().then((data: any) => {
      var dat = data;
      console.log(dat);
      if (dat != undefined) {
        var message = dat.response;
        console.log(message);
        if (message == "1") {
          var tokenName = dat.tokenName;
          var token = dat.token;
          var expires = dat.expires;
          this.cookieService.set(tokenName, token, expires);
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
