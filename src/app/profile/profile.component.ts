import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CoreService } from "../api/core.service";
import { TransactionService } from './../api/transaction.service';
import { NbDialogService } from '@nebular/theme';
import { StockprofileComponent } from "../stockprofile/stockprofile.component";
import { UserService } from "../api/user.service";
import { symbol, map } from 'd3';
import { setTimeout } from 'timers';
import { analyzeAndValidateNgModules } from '@angular/compiler';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
  type: string;
}
import $ from "jquery";
interface PortfolioEntry {
  symbol: string;
  company: string;
  amount: string;
  totalValue?: number;
}

interface TransactionEntry {
  action: string;
  date: string;
  value: string;
  description: string;
  totalValue?: number;
  amount: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private coreService: CoreService, private transactionService: TransactionService, private dialogService: NbDialogService) {
  }

  defaultColumns = ['symbol', 'company', 'amount', 'totalValue'];
  allColumns = [...this.defaultColumns];

  data: TreeNode<PortfolioEntry>[] = [
  ];


  transactionData: TreeNode<TransactionEntry>[] = [
  ];

  profile;
  //TODO add children to data, when more than one transaction with the same stockname has been performed
  ngOnInit() {
    this.loadPortfolio();
    this.loadTransactionData();
  }

  displayStockInformation(symbol) {
    if (symbol.data.type == "root" || symbol.data.symbol == "-") {
      return;
    }
    var receivedSymbol = symbol.data.symbol;
    var stockName = symbol.data.company;
    var hasBackdrop = true;
    var closeOnBackdropClick = true;
    const dialogRef = this.dialogService.open(StockprofileComponent, {
      hasBackdrop, closeOnBackdropClick, context: {
        stockSymbol: receivedSymbol,
        symbolPrice: (symbol.data.totalValue / symbol.data.amount),
        stockName: stockName,
        operation: "sell",
        fixedStockCount: symbol.data.amount,
      }
    });
    dialogRef.onClose.subscribe(_ => { });
  }

  loadPortfolio() {
    this.data = [];
    var stocks = this.userService.getPortfolioItems();
    if (stocks == null) {
      return;
    }
    stocks = this.summarizePortfolio(stocks);
    stocks.forEach(stock => {
      stock.data.totalValue = Number((stock.data.totalValue).toFixed(7));
      this.data.push(stock);
    });
  }

  loadTransactionData() {
    this.transactionData = [];
    var transactions = this.userService.GetUserTransactions();
    transactions.forEach(val => {
      this.transactionData.push(val);
    });
  }

  summarizePortfolio(portfolioItems) {
    var stockArray = [];
    var stockMap = new Map();
    portfolioItems.forEach(item => {
      if (stockMap.has(item.StockName)) {
        var stockIndex = stockMap.get(item.StockName);
        var element = stockArray[stockIndex];
        element.data.amount += item.Quantity;
        element.data.totalValue += (item.CurrentPrice * item.Quantity);
        var entry = { data: { symbol: item.StockName, company: item.CompanyName, amount: item.Quantity, totalValue: (item.CurrentPrice * item.Quantity), type: "child" }, children: [] };
        element.children.push(entry);
        stockArray[stockIndex] = element;
      } else {
        stockMap.set(item.StockName, stockArray.length);
        var element: any = { data: { symbol: item.StockName, company: item.CompanyName, amount: item.Quantity, totalValue: (item.CurrentPrice * item.Quantity), type: "root" }, children: [] };
        element.children.push({ data: { symbol: item.StockName, company: item.CompanyName, amount: item.Quantity, totalValue: (item.CurrentPrice * item.Quantity), type: "child" }, children: [] });
        stockArray.push(element);
      }
    });
    for (const index in stockArray) {
      var array = stockArray[index];
      // seperate current from the next with an empty row
      array.children.push({ data: { symbol: "", company: "", amount: "", totalValue: "", type: "" }, children: [] });
    }
    return stockArray;
  }

  defaultTransactionColumns = ["action", "date", "value", "description", "totalValue", "amount"];
  allTransactionColumns = [...this.defaultTransactionColumns];

  refreshData() {
    var element = $("#refreshButton");
    this.userService.purgeMetadata();
    this.animateIcon(element);
    setTimeout(() => {
      this.loadPortfolio();
      this.loadTransactionData();
    }, 1000);
  }

  animateIcon(element) {
    element.toggleClass("full");
    setTimeout(() => {
      element.css("color", "yellow");
      setTimeout(() => {
        element.css("color", "green");
        setTimeout(() => {
          element.css("color", "white");
        }, 500);
      }, 700);
    }, 0);
  }

  rotate(element, degree) {
    return element.css('transform', 'rotate(' + degree + ')').delay(300);
  }

}

