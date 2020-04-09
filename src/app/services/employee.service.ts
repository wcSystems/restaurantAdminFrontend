import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

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
      `${environment.domain}/employees/${id}`,
      { headers }
    );
  }

  updateEmployee(employee) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });
    return this.http.put<Employee[]>(
      `${environment.domain}/employees`,
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
    return this.http.get<Employee[]>(`${environment.domain}/employees`, {
      headers
    });
  }

  createEmployee(employee) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Employee[]>(
      `${environment.domain}/employees`,
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
      `${environment.domain}/employees/waiters`,
      { headers }
    );
  }

  updateWaiterEmployee(waiter) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put(
      `${environment.domain}/employees/waiters`,
      waiter,
      { headers }
    );
  }
}
