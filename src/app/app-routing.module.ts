import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { ChartComponent } from './chart/chart.component';
import { TaskListComponent } from './task-list/task-list.component';



const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'add-task', component: TaskFormComponent },
  { path: 'edit-task/:postId/edit', component: TaskFormComponent },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
