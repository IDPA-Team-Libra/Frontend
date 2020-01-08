import { NotifierService } from './../notification/notifier.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { TermsComponent } from '../terms/terms.component';
import { CoreService } from "../api/core.service";
import { User } from "../api/user";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../api/user.service";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  username;
  password;
  email;
  account_start_balance;

  public open(hasBackdrop: boolean) {
    const dialogRef = this.dialogService.open(TermsComponent, { hasBackdrop });
    dialogRef.onClose.subscribe(_ => this.registerUser());
  }

  openWithBackdrop() {
    this.open(true);
  }

  constructor(private userService: UserService, private dialogService: NbDialogService, private coreService: CoreService, private notifierService: NotifierService, private cookieService: CookieService, private toastrService: NbToastrService) { }

  ngOnInit() {
  }

  openDialog() {

  }
  index: number = 0;

  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    this.showDefaultIcon("Ihre Email-Adresse ist nicht gültig", "danger", "Ungültige Email")
    return (false)
  }

  ValidateUsername(username) {
    if (username == undefined || username == "") {
      this.showDefaultIcon("Der Nutzername muss mindestens 5 Zeichen lang sein", "danger", "Ungültiger Nutzername")
      return false;
    }
    if (username.length > 5) {
      return true;
    }
  }

  ValidatePassword(password) {
    if (password === undefined) {
      this.showDefaultIcon("Ihr Passwort muss zwischen 7 und 500 Zeichen lang sein.\nEbenfalls muss eine Ziffer sowie ein Sondernzeichen [@#$%^&] enthalten sein", "danger", "Ungültiges Passwort")
      return;
    }
    if (password.length == 0) {
      this.showDefaultIcon("Ihr Passwort muss zwischen 7 und 500 Zeichen lang sein.\nEbenfalls muss eine Ziffer sowie ein Sondernzeichen [@#$%^&] enthalten sein", "danger", "Ungültiges Passwort")
      return;
    }
    var res = password.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_.@#\$%\^&\*])(?=.{8,})");
    if (res != null) {
      return true;
    }
    this.showDefaultIcon("Ihr Passwort muss zwischen 7 und 500 Zeichen lang sein.\nEbenfalls muss eine Ziffer sowie ein Sondernzeichen [@#$%^&] enthalten sein", "danger", "Ungültiges Passwort")
    return false;
  }

  showDefaultIcon(message, status, title) {
    var destroyByClick = true
    var preventDuplicates = true
    //doesn't destroy by time, but only by click
    var duration = 0;
    this.toastrService.show(title, message, { status, destroyByClick, preventDuplicates, duration });
  }

  registerUser() {
    var valid_email = this.ValidateEmail(this.email);
    var valid_password = this.ValidatePassword(this.password);
    var valid_username = this.ValidateUsername(this.username);
    if (valid_email === false || valid_password === false || valid_username === false) {
      return;
    }
    var user = new User(this.username, this.password, this.email);
    var promis = this.coreService.registerUser(user, this.account_start_balance);
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
          this.userService.purgeMetadata();
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

  updateStartBalance(event) {
    var balance = Number(event.target.value);
    if (balance > 0 && balance < 100000000) {
      this.account_start_balance = event.target.value;
    }
  }


  success() {
    this.notifierService.displayNotification("Ihr Konto wurde erstellt", "success", "Registrierung Erfolgreich").onClose.subscribe(function () {
      window.location.href = "/profile"
    });
  }
  failure(message) {
    this.notifierService.displayNotification(message, "danger", "Registrierung Fehlgeschlagen").onClose.subscribe(function () {
    });
  }

}
