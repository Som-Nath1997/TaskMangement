import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  id!:string;
  data!:Date;

  constructor(private fb: FormBuilder, private taskService: TaskService
    ,private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['',Validators.required],
      dueDate: [Date, Validators.required],
    });
    this.id = this.route.snapshot.params['postId'];
    if(this.id){
    this.taskService.find(this.id).subscribe((data: any) => {
      console.log(data);
      this.data = data
      this.taskForm.patchValue({
        taskName: data.taskName,
        description: data.description,
        dueDate: data.dueDate,
      });
    });
  }
  }

  onSubmit() {
    if (this.taskForm.valid && this.id) {
      const task = this.taskForm.value;
    this.taskService.editTask(this.id,task).subscribe(response => {
      console.log('Task edit successfully:', response);
      Swal.fire('Task edit successfully !');
      setTimeout(() => {
        this.taskForm.reset();
        this.router.navigate(['/task-list'])
      }, 2000);
    });
   
   
  } else if (this.taskForm.valid){
    const task = this.taskForm.value;
    this.taskService.addTask(task).subscribe(response => {
      console.log('Task added successfully:', response);
      Swal.fire('Task added successfully !');
      setTimeout(() => {
        this.taskForm.reset();
        this.router.navigate(['/task-list'])
      }, 2000);
    });
   
  }
   else {
    this.markFormGroupTouched(this.taskForm);
  }
}

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
