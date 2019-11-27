import { Component, OnInit, Input } from '@angular/core';
import { StockService } from "../api/stock.service";
import { Stock } from "../api/stock";
import { element } from 'protractor';
import { NbFocusKeyManagerFactoryService } from '@nebular/theme/components/cdk/a11y/focus-key-manager';
import { StockprofileComponent } from "../stockprofile/stockprofile.component";
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';

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

  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  dataSource: NbTreeGridDataSource<FSEntry>;


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  constructor(private stockService: StockService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dialogService: NbDialogService) {
    const returned_data = stockService.loadStockdData();
    returned_data.then((dat: any) => {
      if (dat != undefined) {
        dat['stocks'].forEach(element => {
          var company = element['company'];
          var price = element['price'];
          var symbol = element['symbol'];
          var data = element['data'];
          this.data.push({ data: { symbol: symbol, price: price, company: company }, });
        });
      }
      this.dataSource = this.dataSourceBuilder.create(this.data);
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {

  }

  displayStockInformation(symbol) {
    var receavedSymbol = symbol.data.symbol;
    var symbolPrice = symbol.data.price;
    var hasBackdrop = true;
    var closeOnBackdropClick = true;
    const dialogRef = this.dialogService.open(StockprofileComponent, {
      hasBackdrop, closeOnBackdropClick, context: {
        stockSymbol: receavedSymbol,
        symbolPrice: symbolPrice,
      }
    });
    dialogRef.onClose.subscribe(_ => { });
  }
}

