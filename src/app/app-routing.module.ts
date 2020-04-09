import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './shared/layout/main/main.component';
import { LayoutModule } from './shared/layout/layout.module';
import { LoginComponent } from './components/user/login/login.component';

const routes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'users', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule) },
      { path: 'employees', loadChildren: () => import('./components/employe/employe.module').then(m => m.EmployeModule) },
      { path: 'tables', loadChildren: () => import('./components/table/table.module').then(m => m.TableModule) },
      { path: 'waiterList', loadChildren: () => import('./components/waiters/waiters.module').then(m => m.WaitersModule) },
      { path: 'ordersCompras', loadChildren: () => import('./components/ordenes/ordenes.module').then(m => m.OrdenesModule) },
      { path: 'purchaseOrder', loadChildren: () => import('./components/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule) }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
