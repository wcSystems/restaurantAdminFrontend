import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdenListComponent } from './orden-list/orden-list.component';
import { OrdenFormComponent } from './orden-form/orden-form.component';

import { SharedModule } from './../../shared/shared.module';
import { OrdenCategoryMenuComponent } from './orden-category-menu/orden-category-menu.component';


import { OrdenMenusListComponent } from './orden-menus-list/orden-menus-list.component';


@NgModule({
  declarations: [OrdenListComponent, OrdenFormComponent, OrdenCategoryMenuComponent, OrdenMenusListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: OrdenListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Ordenes'] }},
    ])
  ]
})
export class OrdenesModule { }
