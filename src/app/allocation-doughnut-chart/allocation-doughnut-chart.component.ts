import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";

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
    [5000, 15000],
  ];
  public doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: () => {
      console.log('Hello')
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

  private loadAllocation() {
    console.log(this.userService.getPortfolioItems())
    var positionsizes = new Array()
    var i;
    var currentID
    var currentSize
    var lastID = 0
    var tempSize = 0
    var shouldPush = false
    var moreThanOne = false

    // counts all portfolio entries with the same stock together
    for (i = 0; i < this.portfolio.length; i++) {
      currentSize = (this.portfolio[i]['CurrentPrice'] * this.portfolio[i]['Quantity']);
      currentID = this.portfolio[i]['StockID']
      console.log(currentSize)

      if ((i == this.portfolio.length - 1) && (currentID != lastID)) {
        lastID = 0
        tempSize = currentSize
      }

      if (currentID == lastID) {
        tempSize += currentSize
      } else {
        if (i == 0) {
          tempSize = currentSize
        } else {
          shouldPush = true
        }
      }

      if (shouldPush) {
        tempSize = Math.round((tempSize + Number.EPSILON) * 100) / 100
        positionsizes.push(tempSize)
        tempSize = currentSize
        shouldPush = false
      }
      lastID = currentID
    }

    this.doughnutChartData = positionsizes
    console.log("Position sizes:")
    console.log(positionsizes)
  }

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
    console.log(event, active);
    console.log('clicked chart')
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    console.log('hovering over')
  }

}
