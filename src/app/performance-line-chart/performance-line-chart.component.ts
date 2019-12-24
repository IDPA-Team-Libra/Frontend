import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-performance-line-chart',
  templateUrl: './performance-line-chart.component.html',
  styleUrls: ['./performance-line-chart.component.scss']
})
export class PerformanceLineChartComponent implements OnInit {

  constructor() { }

  lineChartData: ChartDataSets[] = [
    { data: [9, 5, 2, 6, 8, 10.5], label: 'Portfolio Return' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(174, 176, 175)',
      backgroundColor: 'rgba(196, 221, 255)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  ngOnInit() {
  }

}
