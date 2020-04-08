import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, UserListComponent, UserCreateComponent, UserEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '',  component: UserListComponent, data: { breadcrumbs: ['Configuración', 'Lista de Usuario'] }},
      {path: 'create', component: UserCreateComponent, data: { breadcrumbs: ['Configuración', 'Crear Usuario'] } },
      {path: 'edit/:id', component: UserEditComponent, data: { breadcrumbs: ['Configuración', 'Editar Usuario'] } }
    ])
  ]
})
export class UserModule {}
