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
    var registration_result = this.coreService.registerUser(user);
    if (registration_result == true) {
      this.notifierService.displayNotification("Ihr Konto wurde erstellt", "success","Registrierung Erfolgreich").onClose.subscribe(function () {
        window.location.href = "/profile"
      });
    } else {
      this.notifierService.displayNotification(registration_result, "danger","Registrierung Fehlgeschlagen").onClose.subscribe(function () {
        location.reload();
      });
    }
  }
}
