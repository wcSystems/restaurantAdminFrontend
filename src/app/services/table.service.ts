
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Table } from '../models/table.model';

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
    return this.http.get<Table[]>(`http://127.0.0.1:4000/api/table`, this.headers );
  }

  getAllTableOrders() {
    return this.http.get(`http://127.0.0.1:4000/api/table/sale-order`, this.headers );
  }


  postTable(table) {
    return this.http.post<Table[]>(`http://127.0.0.1:4000/api/table`, table , this.headers );
  }

  updateTable(table) {
    return this.http.put<Table[]>(`http://127.0.0.1:4000/api/table`, table, this.headers);
  }

  postOrderTable(tableId) {
    return this.http.post<Table[]>(`http://127.0.0.1:8000/api/sale-orders`, tableId, this.headers);
  }




}

