import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { UserModule } from './components/user/user.module';
import { EmployeModule } from './components/employe/employe.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    DashboardModule,
    UserModule,
    EmployeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
