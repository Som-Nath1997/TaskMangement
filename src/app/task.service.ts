import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasks } from './model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiURL = "http://localhost:3000/tasks";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(this.apiURL);
  }
  
  addTask(task:Tasks): Observable<any> {
    return this.http.post<any>(this.apiURL, task);
  }

  editTask(id: string, task: Tasks): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Tasks>(url, task);
  }

  find(id:string): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Tasks>(url);  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<any>(url);
  }
  
}
