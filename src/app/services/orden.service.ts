import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(
    private http: HttpClient
  ) {

  }

  headers = this.getHeader();

  getHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return { headers };
  }

  getAllOrderType() {
    return this.http.get(`${environment.domain}/order-type`, this.headers );
  }

  getAllCategoryMenu() {
      return this.http.get(`${environment.domain}/category-menu`, this.headers );
  }

  getAllSubCategoryMenu(subCategory) {
      return this.http.post(`${environment.domain}/category-menu/sub_category`, subCategory, this.headers );
  }

  getAllMenuItem(item) {
    return this.http.post(`${environment.domain}/category-menu/menu`, item, this.headers );
  }

  updateOrderTable(item) {
    return this.http.put(`${environment.domain}/sale-order`, item, this.headers );
  }

  postsaleOrderDetail(orderDetail) {
    return this.http.post(`${environment.domain}/sale-order-detail`, orderDetail, this.headers );
  }

  deleteSaleOrderDetail(id) {
    return this.http.delete(`${environment.domain}/sale-order-detail/${id}`, this.headers );
  }

  editSaleOrderDetail(id) {
    return this.http.get(`${environment.domain}/sale-orders/details/${id}`, this.headers );
  }

  editOrderDetail(id) {
    return this.http.get(`${environment.domain}/sale-order/${id}`, this.headers );
  }

  getMenuAll() {
    return this.http.get(`${environment.domain}/rest-menu`, this.headers );
  }

  getStatusOrderAll() {
    return this.http.get(`${environment.domain}/status-order`, this.headers );
  }

  getPaymentMethodAll() {
    return this.http.get(`${environment.domain}/payment-method`, this.headers );
  }

  postPayment(payment) {
    return this.http.post(`${environment.domain}/payment`, payment,  this.headers );
  }

}
