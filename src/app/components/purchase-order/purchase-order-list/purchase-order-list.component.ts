import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../../services/provider.service';

@Component({
  selector: 'smart-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit {

  purchaseOrderList: any[] = [];
  table = true;
  dtOptions: DataTables.Settings = {};

  constructor(
    private providerService: ProviderService
  ) { }

  ngOnInit() {
    this.dtOptions  = {
      processing: true,
      serverSide: true,
      initComplete() { },
      ajax: (dataTablesParameters: any, callback) => {
        this.providerService.purchaseOrderAll(
          dataTablesParameters
        ).subscribe((res: any) => {
          this.purchaseOrderList = res.purchase_order.data;
          callback({
            pageLength: dataTablesParameters.length,
            recordsTotal: res.purchase_order.total,
            data: this.purchaseOrderList,
          });
        });
      },
      columns: [
        { data: 'id', title: 'Id' , searchable: true },
        { data: 'provider_id', title: 'Proveedor' },
        { data: 'num_invoice', title: 'Telefono' },
        { data: 'status', title: 'Estatus' },
        { render( data, type, row, meta ) {
          return `<button class="btn btn-secondary">
                    <i class="fal fa-edit"></i>
                  </button>`; },
          title: 'Editar'
        }
      ],
      rowCallback: (row: Node, data: any[]) => {
        $('td:last-child > button', row).unbind('click').bind('click', () => {
          this.info(data);
        });
      }
    };
  }

  info(data: any) {
     console.log(data);
  }
  newPurchaseOrder() {
    this.providerService.newPurchaseOrder().subscribe( (res: any) => { });
  }

}
