import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-allocation-doughnut-chart',
  templateUrl: './allocation-doughnut-chart.component.html',
  styleUrls: ['./allocation-doughnut-chart.component.scss']
})
export class AllocationChartComponent implements OnInit {

  constructor() { }

  public doughnutChartLabels: Label[] = ['Portfolio Value', 'Invested', 'Cash'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];

  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
