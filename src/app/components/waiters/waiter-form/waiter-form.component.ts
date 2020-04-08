import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  TemplateRef,
  ElementRef,
  ViewChildren,
  Output,
  EventEmitter
} from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { Table } from 'src/app/models/table.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'smart-waiter-form',
  templateUrl: './waiter-form.component.html',
  styleUrls: ['./waiter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaiterFormComponent implements OnInit {
  @Input()
  waiterForm: Employee;

  @Input()
  tableList: Table;

  @Output()
  waiterHijo = new EventEmitter();

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  add(method, mesonero, mesa) {
    const waiter = {
      id: mesonero,
      table_id: mesa,
      status: method
    };
    this.employeeService
      .updateWaiterEmployee(waiter)
      .subscribe((res: any) => {
        this.waiterHijo.emit(res.waiter);
      });
  }
}
