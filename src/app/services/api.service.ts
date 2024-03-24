import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskBody, Options } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient : HttpClient
  ) { }


  get<T>(url: string, options: Options): Observable<T>{ 
    return this.httpClient.get<T>(url, options) as Observable<T>
  }
  post<T>(url: string, body: CreateTaskBody): Observable<T>{ 
    return this.httpClient.post<T>(url, body) as Observable<T>
  }
  }
