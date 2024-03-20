import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, TodoModel } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private apiService: ApiService) { }

  getTodos = (url: string, params: PaginationParams): Observable<TodoModel> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }
}
