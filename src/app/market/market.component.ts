import { Component, OnInit, Input } from '@angular/core';
import { StockService } from "../api/stock.service";
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
    const minWithForMultipleColumns = 0;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  constructor(private stockService: StockService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dialogService: NbDialogService) {
    var returned_data;
    console.log(this.stockService.getState());
    if(this.stockService.getState() === "empty"){
      returned_data = stockService.loadStockdData();
    }else{
      this.data.concat(this.stockService.getData());
      return;
    }
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
      this.stockService.setState(this.data);
    }).catch(err => {
    });
  }

  ngOnInit() {

  }

  displayStockInformation(symbol) {
    var receivedSymbol = symbol.data.symbol;
    var symbolPrice = symbol.data.price;
    var stockName = symbol.data.company;
    var hasBackdrop = true;
    var closeOnBackdropClick = true;
    const dialogRef = this.dialogService.open(StockprofileComponent, {
      hasBackdrop, closeOnBackdropClick, context: {
        stockSymbol: receivedSymbol,
        symbolPrice: symbolPrice,
        stockName: stockName,
        operation: "buy",
      }
    });
    dialogRef.onClose.subscribe(_ => { });
  }
}

