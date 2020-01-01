import { TransactionService } from './../api/transaction.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../auth/authentication.service";
import { NotifierService } from './../notification/notifier.service';
import { Transaction } from '../api/transaction';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from "../api/user.service";
import { json, tickStep } from 'd3';
@Component({
  selector: 'app-stockprofile',
  templateUrl: './stockprofile.component.html',
  styleUrls: ['./stockprofile.component.scss']
})
export class StockprofileComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private authService: AuthenticationService, private notifierService: NotifierService, private transactionService: TransactionService) { }

  stockSymbol = "";
  symbolPrice;
  totalTransactionValue = 0;
  stockCount = 0;
  fixedStockCount = 0;
  checked = false;
  date_set = false;
  stockName = "";
  stockAPIString: any;
  operation;

  showContent(tab) {
    if (tab == "buy") {
      if (this.operation == "buy") {
        return true;
      }
      return false;
    }
    if (tab == "sell") {
      if (this.operation == "sell") {
        return true;
      }
      return false;
    }
  }

  updateTotalValue(event) {
    var val = event.target.value;
    this.stockCount = val;
    this.totalTransactionValue = val * this.symbolPrice;
  }

  toggle(checked: boolean) {
    this.checked = checked;
    if (checked === true) {
      this.totalTransactionValue += 50;
    } else {
      this.date_set = false;
      this.totalTransactionValue -= 50;
    }
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  ngOnInit() {
    this.stockAPIString = this.getSafeUrl("http://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=71424F24416D49649D7155C2D04F7040&symbol=" + this.stockSymbol + "&days=365&width=800&height=420");
    this.queryNews();
  }


  isAuthenticated() {
    return this.authService.isAuthenticated();
  }


  API_KEY = "8d2f4c3636a9499ea138b0efc1aadf17";

  queryNews() {
    this.userService.getNews(this.stockSymbol, this.API_KEY).then((val: any) => {
      if (val.status == "ok") {
        val.articles.forEach(article => {
          this.news_urls.push(article.url);
          this.news_titles.push(article.title);
        });
      }
    });
  }

  openLink(index) {
    window.open(this.news_urls[index])
  }

  news_urls = [];
  news_titles = [];

  buyStock() {
    if (this.isAuthenticated() == false) {
      this.notifierService.displayNotification("Sie müssen sich zuerst einloggen", "warning", "Nicht Authentifiziert");
    }
    var trans = new Transaction(this.stockSymbol, "EMPTY", this.symbolPrice, this.stockCount);
    if (this.date_set) {
      trans.date = this.date;
      this.handleDelayedTransaction(trans);
    } else {
      this.handleBuyTransaction(trans);
    }
    this.userService.purgeMetadata();
  }

  sellStock() {
    if (this.isAuthenticated() == false) {
      this.notifierService.displayNotification("Sie müssen sich zuerst einloggen", "warning", "Nicht Authentifiziert");
    }
    if (this.fixedStockCount < this.stockCount) {
      this.notifierService.displayNotification("Sie können nicht mehr Aktien verkaufen als sie haben", "warning", "Verkauf fehlgeschlagen");
    }
    var trans = new Transaction(this.stockSymbol, "EMPTY", this.symbolPrice.toString(), this.stockCount);
    if (this.date_set == true) {
      trans.date = this.date;
      this.handleTransactionResponse(this.transactionService.sendDelayedSellTransaction(trans));
    } else {
      this.handleTransactionResponse(this.transactionService.sendSellTransaction(trans));
    }
  }

  handleTransactionResponse(response) {
    response.then((data: any) => {
      var state = data["state"];
      var message = data["message"];
      var title = data["title"];
      var operation = data["operation"];
      var value = data["transactionValue"];
      switch (state) {
        case "Failed":
          this.notifierService.displayNotification(message, "warning", title);
          break;
        case "Success":
          if (operation == "*") {

          } else {
            var adjustment_value = parseFloat(value);
            if (operation == "-") {
              adjustment_value *= -1;
            }
            this.userService.updateBalanceAndValue(adjustment_value);
            this.userService.purgeMetadata();
          }
          this.notifierService.displayNotification(message, "success", title).onClose.subscribe(v => {
            location.reload();
          });
          break;
        default:
          break;
      }
    }).catch(err => {
    });
  }

  handleDelayedTransaction(trans) {
    var response = this.transactionService.sendDelayedBuyTransaction(trans);
    this.handleTransactionResponse(response);
  }

  handleBuyTransaction(trans) {
    var response = this.transactionService.sendBuyTransaction(trans);
    this.handleTransactionResponse(response);
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
