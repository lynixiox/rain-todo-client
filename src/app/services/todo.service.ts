import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CreateTaskBody, PaginationParams, TodoModel } from '../types';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private apiService: ApiService) { }

  getTodos = (url: string, params: PaginationParams): Observable<TodoModel[]> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }

  createTask = (url: string, body: CreateTaskBody)=> {
    return this.apiService.post(url, body);
  }


}
