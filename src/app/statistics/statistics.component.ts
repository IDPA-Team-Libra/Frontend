import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";
import { ThrowStmt } from '@angular/compiler';
import { start } from 'repl';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StatisticsComponent implements OnInit {

    userdata
    currentValue
    currentBalance
    startCapital
    result
    totalreturn

    constructor(private userService: UserService, private coreService: CoreService) {
        this.userdata = this.coreService.getUserInformation();
        this.currentValue = Math.round((parseFloat(this.userdata['portfolio']['currentValue']) + Number.EPSILON) * 100) / 100
        this.currentBalance = Math.round((parseFloat(this.userdata['portfolio']['currentBalance']) + Number.EPSILON) * 100) / 100
        this.startCapital = Math.round((parseFloat(this.userdata['portfolio']['startCapital']) + Number.EPSILON) * 100) / 100
        this.result = (this.currentBalance + this.currentValue) - this.startCapital
        this.totalreturn = Math.round(((this.result / this.userdata['portfolio']['startCapital']) * 100 + Number.EPSILON) * 100) / 100 + ' %'
    }
    ngOnInit() { }


    // return current portfolio return
    getPortfolioReturn() {
        return this.totalreturn
    }

    // return current return on investment
    getROI() {
        // ROI = ((Cv - COI) / COI) * 100
        var transactions = this.userService.GetUserTransactions()

        // sum of the $ paid for all stocks
        var totalPaid = 0
        var i;
        for (i = 0; i < transactions.length; i++) {
            totalPaid += Math.round((parseFloat(transactions[i]['data']['totalValue']) + Number.EPSILON) * 100) / 100
        }
        return Math.round(((this.result / (totalPaid)) * 100 + Number.EPSILON) * 100) / 100 + ' %'
    }

    // return balance from cookie
    getCash() {
        var currentBalance = this.userdata['portfolio']['currentBalance']
        var decimalStr = currentBalance.toString().split(".")[1]
        var newFirstDigit = (parseInt(decimalStr[1]) >= 5) ? "5" : "0"
        currentBalance = currentBalance.toString().split(".")[0] + '.' + decimalStr[0] + newFirstDigit
        return this.formatToUSD(currentBalance);
    }

    // return long position from cookie
    getLongValue() {
        return this.formatToUSD(this.currentValue)
    }

    // return overall portfolio value
    getPortfolioValue() {
        var currentValue = Math.round((parseFloat(this.userdata['portfolio']['currentValue']) + Number.EPSILON) * 100) / 100
        var currentBalance = Math.round((parseFloat(this.userdata['portfolio']['currentBalance']) + Number.EPSILON) * 100) / 100
        return this.formatToUSD(currentBalance + currentValue)
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