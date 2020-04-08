import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeListComponent } from './employe-list/employe-list.component';

import { SharedModule } from './../../shared/shared.module';


@NgModule({
  declarations: [EmployeListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: EmployeListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Empleados'] }},
    ])
  ]
})
export class EmployeModule { }
