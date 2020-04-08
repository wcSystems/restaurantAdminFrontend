import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  TemplateRef,
  ElementRef,
  ViewChildren
} from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Table } from '../../../models/table.model';
import { TableService } from '../../../services/table.service';

@Component({
  selector: 'smart-waiter-list',
  templateUrl: './waiter-list.component.html',
  styleUrls: ['./waiter-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaiterListComponent implements OnInit {
  waiterList: Employee[] = [];
  tableList: Table[] = [];
  waiterForm: Employee;

  waiter = false;
  table = true;

  constructor(
    private employeeService: EmployeeService,
    private tableService: TableService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getWaiterAll();
    this.getTableAll();
  }

  getWaiterAll() {
    this.employeeService.getWaiterAll().subscribe((res: any) => {
      this.waiterList = res.data.waiters;
      this.cdr.detectChanges();
    });
  }

  getTableAll() {
    this.tableService.getAllTables().subscribe((res: any) => {
      this.tableList = res.data.tables;
      this.cdr.detectChanges();
    });
  }

  updateWaiter(id: string) {
    this.waiterForm = this.waiterList.find(item => item.id === id);
  }

  updateWaiterTable(waiterHijo) {
    this.waiterForm = waiterHijo;
  }

  atras() {
    this.getWaiterAll();
    this.getTableAll();
    this.waiter = false;
    this.table = true;
    this.cdr.detectChanges();
  }
}
