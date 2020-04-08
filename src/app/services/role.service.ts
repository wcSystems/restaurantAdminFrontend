import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  getAllRoles() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    return this.http.get<Role[]>(`http://127.0.0.1:4000/api/role`, { headers });
  }
}
