import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks!: any[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
   this.getTaskData();
  }
getTaskData(){
  this.taskService.getTasks().subscribe((tasks) => {
    this.tasks = tasks;
  });
}
  editTask(index: number) {
    // Implement edit functionality
  }

  deleteTask(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(id).subscribe(res => {
          console.log(res)
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          setTimeout(() => {
            this.getTaskData();
          }, 1000);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your file is safe :)', 'error');
      }
    });  
  }

}
