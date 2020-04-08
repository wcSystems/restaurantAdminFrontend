import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  constructor(
    private http: HttpClient,
  ) { }

  getWaiterAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.get<Employee[]>(`http://127.0.0.1:4000/api/employee/waiter`, { headers } );
  }

}
