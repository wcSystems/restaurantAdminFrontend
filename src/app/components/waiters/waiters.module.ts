import { NgModule } from '@angular/core';
import { WaiterListComponent } from './waiter-list/waiter-list.component';
import { WaiterFormComponent } from './waiter-form/waiter-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';




@NgModule({
  declarations: [WaiterListComponent, WaiterFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: WaiterListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Mesoneros'] }},
    ])
  ]
})
export class WaitersModule { }
