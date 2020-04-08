import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { OrdenService } from '../../../services/orden.service';
import { Customer } from '../../../models/customer.moldel';
import { OrderService  } from '../../../services/comunications/order.service';

import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'smart-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenFormComponent implements OnInit {

  identityCard2 = new FormControl('', []);

  constructor(
    private customerService: CustomerService,
    private ordenService: OrdenService,
    private comunitacionsOrderServices: OrderService,
    public pComunitacionsOServices: OrderService,
    private cdr: ChangeDetectorRef,
  ) {
    this.identityCard2.valueChanges
    .pipe(
      debounceTime(350)
    )
    .subscribe(value => {
      this.customerService.getCustomerIdentityCard(value).subscribe((res: any) => {
        this.customerList = res.customer;

        if (this.customerList.find(i => i.identity_card === value)) {

          this.comunitacionsOrderServices.methodSendObj(
            [
              {clave: 'customerId', valor: this.customerList.find(i => i.identity_card === value).id},
              {clave: 'identityCard', valor: this.customerList.find(i => i.identity_card === value).identity_card},
              {clave: 'firstname', valor: this.customerList.find(i => i.identity_card === value).firstname},
              {clave: 'lastname', valor: this.customerList.find(i => i.identity_card === value).lastname},
              {clave: 'phone', valor: this.customerList.find(i => i.identity_card === value).phone}
          ]);

        } else {

          this.comunitacionsOrderServices.methodSendObj(
            [
              {clave: 'customerId', valor: 0},
              {clave: 'firstname', valor: ''},
              {clave: 'identityCard', valor: value},
              {clave: 'lastname', valor: ''},
              {clave: 'phone', valor: ''}
          ]);

        }
      });
    });
   }

   customerList: Customer[] = [];

   customerId: any;
   orderTipeId: any;

   orderTypeList: any;

   table: any = {id: '', name: '', created_at: '', updated_at: ''};
   saleOrderId: any;

  ngOnInit() {
    this.comunitacionsOrderServices.objObservable.subscribe(res => {

      this.saleOrderId = res.saleOrderId;
      this.table = res.table;
      this.customerId = res.customerId;
    });
    this.getAllOrderType();
  }


  getAllOrderType() {
    this.ordenService.getAllOrderType().subscribe((res: any) => {
      this.orderTypeList = res.data.order_type;
      this.cdr.detectChanges();
    });
  }



}
