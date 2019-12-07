import { Component, OnInit, Input } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CoreService } from "../api/core.service";
import { TransactionService } from './../api/transaction.service';
import { symbol } from 'd3';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

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

  constructor(private coreService: CoreService, private transactionService: TransactionService) {
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
    var user = this.coreService.getUserInformation();
    if (user == undefined) {
      console.log("Error");
    } else {
      console.log(user);
      this.loadPortfolio(user);
      this.loadTransactionData();
    }
  }

  loadPortfolio(user) {
    var stocks
      = user.portfolio.items;
    stocks.forEach(stock => {
      var stock_el = { data: { symbol: stock.StockName, amount: stock.Quantity, company: stock.CompanyName, totalValue: stock.TotalBuyPrice } };
      this.data.push(stock_el);
    });
  }

  loadTransactionData() {
    var transactions = this.coreService.GetUserTransactions();
    console.log(transactions);
    transactions.forEach(val => {
      this.transactionData.push(val);
      console.log(val);
    });
  }

  defaultTransactionColumns = ["action", "date", "value", "description", "totalValue", "amount"];
  allTransactionColumns = [...this.defaultTransactionColumns];
}

