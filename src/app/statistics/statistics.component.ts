import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class StatisticsComponent implements OnInit{

    ngOnInit() {}

    loadStatistics(){}

    getPerformance(){}

    getCash(){}

    getMarketValue(){}
 }