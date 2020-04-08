import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { TableService } from '../../../services/table.service';
import { Table } from 'src/app/models/table.model';
import { OrderService  } from '../../../services/comunications/order.service';
import { OrdenService  } from '../../../services/orden.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'smart-orden-list',
  templateUrl: './orden-list.component.html',
  styleUrls: ['./orden-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdenListComponent implements OnInit {
  constructor(
    private tableService: TableService,
    private cdr: ChangeDetectorRef,
    private comunitacionsOrderServices: OrderService,
    private ordenService: OrdenService,
    private customerService: CustomerService
  ) {}

  booleanForm = false;
  listTablesOrdenes = true;
  tableList: Table[] = [];
  table: Table;
  saleOrderId: any;


  ngOnInit() {
    this.getAllTable();
  }


  getAllTable() {
    this.tableService.getAllTableOrders().subscribe((res: any) => {
      this.tableList = res.data.tables;
      this.cdr.detectChanges();
    });
  }

  btnBooleanForm() {
    this.booleanForm = false;
    this.cdr.detectChanges();
  }

  formOrdenTable(state: string, objet: any, idOrder: any) {
    switch (state) {
      case 'add':
        const newOrder = {
          table_id: objet.id
        };
        this.tableService.postOrderTable(newOrder).subscribe((res: any) => {
          // tslint:disable-next-line: no-string-literal
          this.tableList.find(i => i.id === objet.id)['sale_orders'].push(res.sale_order);
          this.saleOrderId = res.sale_order.id;
          this.table = objet;
          this.comunitacionsOrderServices.methodSendObj(
            [
              {clave: 'saleOrderId', valor: this.saleOrderId},
              {clave: 'table', valor: this.table},
              {clave: 'comment', valor: ''},
              {clave: 'orderTipeId', valor: ''},
              {clave: 'identityCard', valor: ''},
              {clave: 'firstname', valor: ''},
              {clave: 'lastname', valor: ''},
              {clave: 'phone', valor: ''},
              {clave: 'completed', valor: []}
          ]);
          this.booleanForm = true;
          this.cdr.detectChanges();
        });
        break;
      case 'edit':
        this.ordenService.editSaleOrderDetail(idOrder).subscribe((res: any) => {
          this.comunitacionsOrderServices.methodSendObj(
            [
              {clave: 'completed', valor: res.sale_order_details},
            ]);
          this.ordenService.editOrderDetail(idOrder).subscribe((res2: any) => {
            this.comunitacionsOrderServices.methodSendObj(
              [
                {clave: 'saleOrderId', valor: idOrder},
                {clave: 'table', valor: objet},
              ]);
            this.customerService.getCustomer(res2.data.sale_order.customer_id).subscribe((res3: any) => {
                if (res3.error === 1) {
                  this.comunitacionsOrderServices.methodSendObj(
                    [
                      {clave: 'comment', valor: res2.data.sale_order.comment},
                      {clave: 'orderTipeId', valor: res2.data.sale_order.order_type_id},
                      {clave: 'identityCard', valor: ''},
                      {clave: 'firstname', valor: ''},
                      {clave: 'lastname', valor: ''},
                      {clave: 'phone', valor: ''}
                    ]);
                }
                if (res3.error === 0) {
                  this.comunitacionsOrderServices.methodSendObj(
                    [
                      {clave: 'comment', valor: res2.data.sale_order.comment},
                      {clave: 'orderTipeId', valor: res2.data.sale_order.order_type_id},
                      {clave: 'identityCard', valor: res3.data.customer.identity_card},
                      {clave: 'firstname', valor: res3.data.customer.firstname},
                      {clave: 'lastname', valor: res3.data.customer.lastname},
                      {clave: 'phone', valor: res3.data.customer.phone}
                    ]);
                }
            });
            this.booleanForm = true;
            this.cdr.detectChanges();
          });
        });
        break;
      default:
        break;
    }
  }

}
