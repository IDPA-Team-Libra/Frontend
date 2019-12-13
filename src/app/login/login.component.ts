import { NotifierService } from './../notification/notifier.service';
import { Component, OnInit } from '@angular/core';
import { CoreService } from "../api/core.service";
import { User } from "../api/user";
import { CookieService } from "ngx-cookie-service";
import { TransactionService } from './../api/transaction.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username;
  password;

  constructor(private coreService: CoreService, private cookieService: CookieService, private notifierService: NotifierService, private transactionService: TransactionService) { }

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
          this.cookieService.set("authenticated", "true");
          this.loadTransactionData(this.coreService.getUserInformation().username);
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

  loadTransactionData(username) {
    var arr = [];
    this.transactionService.requestTransactions(username).then(val => {
      if (val != undefined) {
        for (const index in val) {
          var transaction = val[index];
          var transaction_el = { data: { action: transaction.action, date: transaction.date, value: transaction.value, description: transaction.description, totalValue: Number(transaction.amount) * Number(transaction.value), amount: transaction.amount } };
          arr.push(transaction_el);
        }
        this.cookieService.set("transactions", JSON.stringify(arr));
      }
    });
  }
}
