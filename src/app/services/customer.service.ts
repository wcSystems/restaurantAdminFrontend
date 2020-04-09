import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; 

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
    return this.http.get(`${environment.domain}/customers`, this.headers );
  }

  postCustomer(customer) {
    return this.http.post(`${environment.domain}/customers`, customer, this.headers );
  }

  getCustomer(id) {
    return this.http.get(`${environment.domain}/customers/${id}`, this.headers );
  }

  getCustomerIdentityCard(IdentityCard) {
    return this.http.get(`${environment.domain}/customers/search/${IdentityCard}`, this.headers );
  }
}
