import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getEmployee(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });
    return this.http.get<Employee[]>(
      `http://127.0.0.1:4000/api/employee/${id}`,
      { headers }
    );
  }

  updateEmployee(employee) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });
    return this.http.put<Employee[]>(
      `http://127.0.0.1:4000/api/employee`,
      employee,
      {
        headers
      }
    );
  }

  getEmployeeAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });
    return this.http.get<Employee[]>(`http://127.0.0.1:4000/api/employee`, {
      headers
    });
  }

  createEmployee(employee) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Employee[]>(
      `http://127.0.0.1:4000/api/employee`,
      employee,
      { headers }
    );
  }

  getWaiterAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.get<Employee[]>(
      `http://127.0.0.1:4000/api/employee/waiter`,
      { headers }
    );
  }

  updateWaiterEmployee(waiter) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put(
      `http://127.0.0.1:8000/api/employees/waiters`,
      waiter,
      { headers }
    );
  }
}
