import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { UserService } from "../api/user.service";
import { CoreService } from "../api/core.service";
import { PerformanceService } from "../api/performance.service";

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

  constructor(private userService: UserService, private coreService: CoreService, private performanceService: PerformanceService) {
    this.userdata = this.coreService.getUserInformation();
    this.currentValue = Math.round((parseFloat(this.userdata['portfolio']['currentValue']) + Number.EPSILON) * 100) / 100
    this.currentBalance = Math.round((parseFloat(this.userdata['portfolio']['currentBalance']) + Number.EPSILON) * 100) / 100
    this.startCapital = Math.round((parseFloat(this.userdata['portfolio']['startCapital']) + Number.EPSILON) * 100) / 100
    this.result = (this.currentBalance + this.currentValue) - this.startCapital
    this.totalreturn = Math.round(((this.result / this.userdata['portfolio']['startCapital']) * 100 + Number.EPSILON) * 100) / 100 + ' %'
    this.loadPerformance();
  }

  loadPerformance() {
    var prom = this.performanceService.loadUserPerformance();
    var data = [];
    prom.then((val: any) => {
      if (val == undefined) {
        return;
      }
      try {
        val.array.forEach(value => {
          data.push(value.performance);
          this.lineChartLabels.push(value.date);
        });
        this.lineChartData.push({ data: data, label: "Performance" });
      } catch{
        if (val.message == "Was not able to validate user") {
          this.userService.setErrorTokenAndClear();
        }
      }
    });
  }

  ngOnInit() {
  }

  lineChartData: ChartDataSets[] = [
  ];

  lineChartLabels: Label[] = [];
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
