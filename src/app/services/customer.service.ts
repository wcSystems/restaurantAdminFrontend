import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  headers = this.getHeader();

  constructor(
    private http: HttpClient
  ) { }

  getHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return { headers };
  }

  getAllCustomers() {
    return this.http.get(`http://127.0.0.1:4000/api/customer`, this.headers );
  }

  postCustomer(customer) {
    return this.http.post(`http://127.0.0.1:4000/api/customer`, customer, this.headers );
  }

  getCustomer(id) {
    return this.http.get(`http://127.0.0.1:4000/api/customer/${id}`, this.headers );
  }

  getCustomerIdentityCard(IdentityCard) {
    return this.http.get(`http://127.0.0.1:8000/api/customers/search/${IdentityCard}`, this.headers );
  }
}
