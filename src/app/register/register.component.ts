import { NotifierService } from './../nofitication/notifier.service';
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

  constructor(private dialogService: NbDialogService, private coreService: CoreService, private notifierService: NotifierService, private cookieService: CookieService) { }

  ngOnInit() {
  }

  openDialog() {
  }

  registerUser() {
    var user = new User(this.username, this.password, this.email);
    var promis = this.coreService.registerUser(user);
    promis.then((data: any) => {
      var dat = data;
      if (dat !== undefined) {
        var message = dat.response;
        if (dat.response === undefined) {
          this.failure(dat);
          return;
        }
        if (message === 'Success') {
          var tokenName = dat.tokenName;
          var token = dat.token;
          var expires = dat.expires;
          var user = dat.user;
          this.cookieService.set(tokenName, token, expires);
          this.cookieService.set("user", user);
          this.cookieService.set("authenticated", "true");
          this.success();
          return;
        } else {
          this.failure(message);
        }
      } else {
        this.failure(dat);
      }
    }).catch(err => {
      this.failure("Bitte erneut versuchen");
    });
  }

  success() {
    this.notifierService.displayNotification("Ihr Konto wurde erstellt", "success", "Registrierung Erfolgreich").onClose.subscribe(function () {
      window.location.href = "/profile"
    });
  }
  failure(message) {
    this.notifierService.displayNotification(message, "danger", "Registrierung Fehlgeschlagen").onClose.subscribe(function () {
      location.reload();
    });
  }

}
