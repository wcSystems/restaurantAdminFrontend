import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private http: HttpClient
  ) { }

  headers = this.getHeader();

  getHeader() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return { headers };
  }

  purchaseOrderAll(dataTablesParameters) {
    // tslint:disable-next-line: radix
    const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
    return this.http.get(`http://127.0.0.1:8000/api/purchase-orders?page=${page}`, this.headers );
  }

  providers() {
    return this.http.get(`http://127.0.0.1:8000/api/providers`, this.headers );
  }

  providersFilter(req) {
    return this.http.get(`http://127.0.0.1:8000/api/providers/search/${req}`, this.headers );
  }

  categoryProducts() {
    return this.http.get(`http://127.0.0.1:8000/api/category-products`, this.headers );
  }

  getAllSubCategoryProduct(idCategory) {
    return this.http.post(`http://127.0.0.1:8000/api/category-products/sub_category`, idCategory, this.headers );
  }

  getAllCategoryProduct(id) {
    return this.http.post(`http://127.0.0.1:8000/api/category-products/products`, id, this.headers );
  }

  getAllProduct() {
    return this.http.get(`http://127.0.0.1:8000/api/products`, this.headers );
  }

  newPurchaseOrder() {
    const newPurchaseOrder = {
      provider_id: 1
    };
    return this.http.post(`http://127.0.0.1:4000/api/purchase-order`, newPurchaseOrder, this.headers );
  }

  newProvider(provider) {
    return this.http.post(`http://127.0.0.1:4000/api/provider`, provider, this.headers );
  }

}
