import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdKeyPipe } from '../pipe/id-key.pipe';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { TotalesPipe } from '../pipe/totales.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {ScrollingModule} from '@angular/cdk/scrolling';

import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [IdKeyPipe, TotalesPipe],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    ScrollingModule,
    Ng2SmartTableModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    IdKeyPipe,
    DataTablesModule,
    HttpClientModule,
    TotalesPipe,
    ReactiveFormsModule,
    DragDropModule,
    ScrollingModule,
    Ng2SmartTableModule
  ]

})
export class SharedModule { }
