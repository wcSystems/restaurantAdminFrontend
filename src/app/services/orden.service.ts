import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
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
    return this.http.get(`http://127.0.0.1:4000/api/order-type`, this.headers );
  }

  getAllCategoryMenu() {
      return this.http.get(`http://127.0.0.1:4000/api/category-menu`, this.headers );
  }

  getAllSubCategoryMenu(subCategory) {
      return this.http.post(`http://127.0.0.1:4000/api/category-menu/sub_category`, subCategory, this.headers );
  }

  getAllMenuItem(item) {
    return this.http.post(`http://127.0.0.1:4000/api/category-menu/menu`, item, this.headers );
  }

  updateOrderTable(item) {
    return this.http.put(`http://127.0.0.1:4000/api/sale-order`, item, this.headers );
  }

  postsaleOrderDetail(orderDetail) {
    return this.http.post(`http://127.0.0.1:4000/api/sale-order-detail`, orderDetail, this.headers );
  }

  deleteSaleOrderDetail(id) {
    return this.http.delete(`http://127.0.0.1:4000/api/sale-order-detail/${id}`, this.headers );
  }

  editSaleOrderDetail(id) {
    return this.http.get(`http://127.0.0.1:8000/api/sale-orders/details/${id}`, this.headers );
  }

  editOrderDetail(id) {
    return this.http.get(`http://127.0.0.1:4000/api/sale-order/${id}`, this.headers );
  }

  getMenuAll() {
    return this.http.get(`http://127.0.0.1:4000/api/rest-menu`, this.headers );
  }

  getStatusOrderAll() {
    return this.http.get(`http://127.0.0.1:4000/api/status-order`, this.headers );
  }

  getPaymentMethodAll() {
    return this.http.get(`http://127.0.0.1:4000/api/payment-method`, this.headers );
  }

  postPayment(payment) {
    return this.http.post(`http://127.0.0.1:4000/api/payment`, payment,  this.headers );
  }

}
