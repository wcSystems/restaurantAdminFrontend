import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { SharedModule } from './../../shared/shared.module';
import { FormProviderComponent } from './form-provider/form-provider.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [PurchaseOrderListComponent, FormProviderComponent, ProductListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: PurchaseOrderListComponent, data: { breadcrumbs: ['Configuración', 'Ordenes de Compra'] }},
    ])
  ]
})
export class PurchaseOrderModule { }
