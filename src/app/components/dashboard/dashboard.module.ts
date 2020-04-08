import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

import { SharedModule } from './../../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: DashboardComponent,
        data: { breadcrumbs: ['Inicio', 'Dashboard'] }
      }
    ])
  ]
})
export class DashboardModule { }
