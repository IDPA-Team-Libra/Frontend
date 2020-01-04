import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";
import { ChartDataSets, ChartOptions } from 'chart.js';
@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StatisticsComponent implements OnInit {

    userdata

    constructor(private userService: UserService, private coreService: CoreService) { this.userdata = this.coreService.getUserInformation(); }
    ngOnInit() { 
        this.buildCashGraph();
    }

    buildCashGraph(){
        var transactions = this.userService.GetRawUserTransactions();
        var data = [];
        var mapping = new Map();
        transactions.forEach((val) =>{
            mapping.set(val.date,val.currentBalance);
        });
        for (let [k, v] of mapping) {
            data.push(v);
            this.chartLabels.push(k);
        }
        this.chartData.push({data: data, label:"Chash"});
        console.log(this.chartData);
    }
    public chartData: ChartDataSets[] = [
    ];
    public chartLabels = [];
    public chartType = 'line';
    public chartLegend = true;

    public chartOptions = {
        scaleShowVerticalLines: true,
        responsive: true
    };

    // return current portfolio return
    getPortfolioReturn() {
        var netprofit = this.userdata['portfolio']['currentValue'] - this.userdata['portfolio']['startCapital']
        netprofit = Math.round((netprofit + Number.EPSILON) * 100) / 100
        return Math.round(((netprofit / this.userdata['portfolio']['startCapital']) * 100 + Number.EPSILON) * 100) / 100 + ' %'
    }

    // return current return on investment
    getROI() {
        // ROI = ((Cv - COI) / COI) * 100
        var netprofit = this.userdata['portfolio']['currentValue'] - this.userdata['portfolio']['startCapital']
        netprofit = Math.round((netprofit + Number.EPSILON) * 100) / 100
        var transactions = this.userService.GetUserTransactions()
        // sum of the $ paid for all stocks
        var totalPaid = 0
        var i;
        for (i = 0; i < transactions.length; i++) {
            totalPaid += Math.round((parseFloat(transactions[i]['data']['totalValue']) + Number.EPSILON) * 100) / 100
        }
        return Math.round(((netprofit / (totalPaid)) * 100 + Number.EPSILON) * 100) / 100 + ' %'
    }

    // return balance from cookie
    getCash() {
        var currentBalance = this.userdata['portfolio']['currentBalance']
        var decimalStr = currentBalance.toString().split(".")[1]
        var newFirstDigit = (parseInt(decimalStr[1]) >= 5) ? "5" : "0"
        currentBalance = currentBalance.toString().split(".")[0] + '.' + decimalStr[0] + newFirstDigit
        return this.formatToUSD(currentBalance);
    }

    // return current value from cookie
    getMarketValue() {
        return this.formatToUSD(this.userdata['portfolio']['currentValue'])
    }

    getTradesMade() {
        var transactions = this.userService.GetUserTransactions()
        return transactions.length
    }

    public performanceChartOption = {
        scaleShowVerticalLines: false,
        responsive: true
    }

    formatToUSD = function (val) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(val);
    }
}