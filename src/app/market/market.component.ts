import { Component, OnInit, Input } from '@angular/core';
import { StockService } from "../api/stock.service";
import { Stock } from "../api/stock";
import { element } from 'protractor';
import { NbFocusKeyManagerFactoryService } from '@nebular/theme/components/cdk/a11y/focus-key-manager';


interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
interface FSEntry {
  symbol: string;
  company: string;
  price: string;
}
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  customColumn = 'symbol';
  defaultColumns = ['company', 'price'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  data: TreeNode<FSEntry>[] = [

  ];
  constructor(private stockService: StockService) {
    var returned_data = stockService.loadStockdData();
    console.log(returned_data);
  }

  ngOnInit() {

  }

  private rows: Stock[] = [];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
}

