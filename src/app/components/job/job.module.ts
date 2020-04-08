import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { JobListComponent } from './job-list/job-list.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [JobListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: JobListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Trabajos'] }},
    ])
  ]
})
export class JobModule { }
