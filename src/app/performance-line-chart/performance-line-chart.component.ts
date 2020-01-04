import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";

@Component({
  selector: 'app-performance-line-chart',
  templateUrl: './performance-line-chart.component.html',
  styleUrls: ['./performance-line-chart.component.scss']
})
export class PerformanceLineChartComponent implements OnInit {

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

  ngOnInit() {
  }

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
      backgroundColor: 'rgba(114, 108, 217)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  downloadCanvas(event) {
    var anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "performance.png";
  }

}
