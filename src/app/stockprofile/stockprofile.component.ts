import { TransactionService } from './../api/transaction.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../auth/authentication.service";
import { NotifierService } from './../nofitication/notifier.service';
import { Transaction } from '../api/transaction';
import { json } from 'd3';
@Component({
  selector: 'app-stockprofile',
  templateUrl: './stockprofile.component.html',
  styleUrls: ['./stockprofile.component.scss']
})
export class StockprofileComponent implements OnInit {

  constructor(private authService: AuthenticationService, private notifierService: NotifierService, private transactionService: TransactionService) { }

  stockSymbol = "";
  symbolPrice;
  totalTransactionValue = 0;
  stockCount = 0;
  checked = false;
  date_set = false;
  stockName = "";

  updateTotalValue(event) {
    var val = event.target.value;
    this.stockCount = val;
    this.totalTransactionValue = val * this.symbolPrice;
  }

  toggle(checked: boolean) {
    this.checked = checked;
    if (checked == true) {
      this.totalTransactionValue += 50;
    } else {
      this.totalTransactionValue -= 50;
    }
  }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  buyStock() {
    var trans = new Transaction(this.stockSymbol, "EMPTY", this.symbolPrice, this.stockCount);
    if (this.date_set) {
      trans.date = this.date;
      this.handleDelayedTransaction(trans);
    } else {
      this.handleBuyTransaction(trans);
    }

  }

  handleDelayedTransaction(trans) {
    var response = this.transactionService.sendDelayedBuyTransaction(trans);
    response.then((data: any) => {
      var state = data["state"];
      var message = data["message"];
      var title = data["title"];
      switch (state) {
        case "Failed":
          this.notifierService.displayNotification(message, "warning", title);
          break;
        case "Success":
          this.notifierService.displayNotification(message, "success", title).onClose.subscribe(v => {
            location.reload();
          });
          break;
        default:
          break;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleBuyTransaction(trans) {
    var response = this.transactionService.sendBuyTransaction(trans);
    response.then((data: any) => {
      var state = data["state"];
      var message = data["message"];
      var title = data["title"];
      switch (state) {
        case "Failed":
          this.notifierService.displayNotification(message, "warning", title);
          break;
        case "Success":
          this.notifierService.displayNotification(message, "success", title).onClose.subscribe(v => {
            location.reload();
          });
          break;
        default:
          break;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  isChecked() {
    return this.checked;
  }

  date = new Date();

  handleDateChange(event) {
    var dat = new Date(event);
    var now = new Date();
    if (now > dat) {
      this.notifierService.displayNotification("Bitte wählen Sie einen Tag in der Zukunft", "warning", "Ungültige Kalenderwahl");
    } else {
      this.date = dat;
      this.date_set = true;
    }
  }
}
