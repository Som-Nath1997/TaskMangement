import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";
export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  tasksDueInNext7Days: any[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  data:any
  tasksDueNext7Days:any[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks:any) => {
       // Count tasks for each unique due date
    const taskCountMap = tasks.reduce((acc:any, task:any) => {
      const dueDate = task.dueDate;
      acc[dueDate] = (acc[dueDate] || 0) + 1;
      return acc;
    }, {});

    // Convert the map into an array of objects
    const taskCounts = Object.keys(taskCountMap).map(dueDate => ({
      dueDate,
      count: taskCountMap[dueDate]
    }));
      const dueTasksInNext7Days = this.calculateDueTasksInNext7Days(taskCounts);
      console.log(dueTasksInNext7Days)
      dueTasksInNext7Days.sort((a,b) => Date.parse(b.dueDate) - Date.parse(a.dueDate))
      this.chartOptions = {
        series: [{
          name: 'Tasks',
          data: dueTasksInNext7Days.map(cou => cou.count)
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        xaxis: {
          categories:dueTasksInNext7Days.map(date => date.dueDate),
          title: {
            text: 'Due Dates'
          }
        },
        yaxis: {
          title: {
            text: 'Number of Tasks'
          }
        }
      };
    }); 
  }
  private calculateDueTasksInNext7Days(tasks: any[]): any[] {

    const currentDate = new Date();
    const next7Days  = new Date();
    next7Days.setDate(currentDate.getDate() + 7);
 return tasks
      .filter((task:any) => new Date(task.dueDate) <= next7Days);
  }
}
