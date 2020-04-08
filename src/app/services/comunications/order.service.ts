import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() { }

  obj: any;
  firstname: any;
  lastname: any;
  saleOrderId: any;
  table: any;

  customerId: any;
  identityCard: any;
  phone: any;

  orderTipeId: any;

  statusOrderId: any;

  comment: any;

  completed: any;

  private privateObj = new Subject<any>();
  objObservable = this.privateObj.asObservable();

  methodSendObj(obj) {
    obj.forEach(element => {
      switch (element.clave) {
        case 'firstname':
          this.firstname = element.valor;
          break;
        case 'lastname':
          this.lastname = element.valor;
          break;
        case 'saleOrderId':
          this.saleOrderId = element.valor;
          break;
        case 'table':
          this.table = element.valor;
          break;
        case 'customerId':
          this.customerId = element.valor;
          break;
        case 'identityCard':
          this.identityCard = element.valor;
          break;
        case 'phone':
          this.phone = element.valor;
          break;
        case 'orderTipeId':
          this.orderTipeId = element.valor;
          break;
        case 'comment':
          this.comment = element.valor;
          break;
        case 'completed':
          this.completed = element.valor;
          break;
        case 'statusOrderId':
          this.statusOrderId = element.valor;
          break;
        default:
          break;
      }
    });


    this.obj = {
      firstname: this.firstname,
      lastname: this.lastname,
      saleOrderId: this.saleOrderId,
      table: this.table,
      customerId: this.customerId,
      identityCard: this.identityCard,
      phone: this.phone,
      orderTipeId: this.orderTipeId,
      comment: this.comment,
      completed: this.completed,
      statusOrderId: this.statusOrderId
    };

    this.privateObj.next(this.obj);
  }


}
