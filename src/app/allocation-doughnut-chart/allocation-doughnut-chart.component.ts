import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-allocation-doughnut-chart',
  templateUrl: './allocation-doughnut-chart.component.html',
  styleUrls: ['./allocation-doughnut-chart.component.scss']
})
export class AllocationChartComponent implements OnInit {

  portfolio

  constructor(private userService: UserService, private coreService: CoreService) {
    this.portfolio = this.userService.getPortfolioItems();
  }

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
    [],
  ];
  public doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    onClick: () => {
      console.log('Clicked me!')
    }
  }

  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
    this.loadTickers()
    this.loadAllocation();
  }

  private loadTickers() {
    this.doughnutChartLabels = this.getSortedStocksInPortfolio()
  }

  // counts portfolio entry sizes with same ticker together -> total positionsize
  private loadAllocation() {
    var positionsizes = new Array()
    var i;
    var tempSize = 0
    var tickers = this.getSortedStocksInPortfolio()
    var ticker = ""
    for (ticker of tickers) {
      tempSize = 0
      for (i = 0; i < this.portfolio.length; i++) {
        if (this.portfolio[i]['StockName'] == ticker) {
          tempSize += (this.portfolio[i]['CurrentPrice'] * this.portfolio[i]['Quantity'])
        }

      }
      console.log(ticker + " with a size of: " + tempSize)
      tempSize = Math.round((tempSize + Number.EPSILON) * 100) / 100
      positionsizes.push(tempSize)
    }
    this.doughnutChartData = positionsizes
  }

  // returns individual tickers
  private getSortedStocksInPortfolio() {
    var i;
    var ticker = ""
    var stocks = new Array()
    for (i = 0; i < this.portfolio.length; i++) {
      ticker = this.portfolio[i]['StockName']
      if (!stocks.includes(ticker)) {
        stocks.push(ticker)
      }
      ticker = ""
    }
    return stocks;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  }

  downloadCanvas(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL();
    anchor.download = "allocation.png";
  }
}
