import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';

import { SharedModule } from './../../shared/shared.module';



@NgModule({
  declarations: [TableListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: TableListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Mesas'] }},
    ])
  ]
})
export class TableModule { }
