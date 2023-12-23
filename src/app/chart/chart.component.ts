import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartOptions: any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // Implement chart data and options
    this.taskService.getTasks().subscribe((tasks) => {
      // Calculate tasks due in the next 7 days and update chartOptions
    });
  }

}
