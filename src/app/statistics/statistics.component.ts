import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserService } from "../api/user.service";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StatisticsComponent implements OnInit{

    constructor(private userService: UserService){}

    ngOnInit() {}


    getPerformance(){
        // ROI = ((Cv - COI) / COI) * 100
        // Rp = NP / P 
    }

    getCash(){
        // return balance
        var portfolioitems = this.userService.getPortfolioItems()
        console.log(portfolioitems)
        console.log(portfolioitems[0])
        return "drei"
    }

    getMarketValue(){
        // return current value from cookie
    }

    public performanceChartOption = {
        scaleShowVerticalLines: false,
        responsive: true
    }
 }