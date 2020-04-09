
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from '../models/table.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  headers = this.getHeader();

  constructor(private http: HttpClient) { }

  getHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return { headers };
  }

  getAllTables() {
    return this.http.get<Table[]>(`${environment.domain}/tables`, this.headers );
  }

  getAllTableOrders() {
    return this.http.get(`${environment.domain}/tables/sale-orders`, this.headers );
  }


  postTable(table) {
    return this.http.post<Table[]>(`${environment.domain}/tables`, table , this.headers );
  }

  updateTable(table) {
    return this.http.put<Table[]>(`${environment.domain}/tables`, table, this.headers);
  }

  postOrderTable(tableId) {
    return this.http.post<Table[]>(`${environment.domain}/sale-orders`, tableId, this.headers);
  }




}

