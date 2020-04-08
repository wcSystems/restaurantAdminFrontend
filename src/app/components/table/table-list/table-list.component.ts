import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ElementRef, ViewChildren } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

import { Table } from 'src/app/models/table.model';
import { TableService  } from '../../../services/table.service';
import { SeatService } from '../../../services/seat.service';
import { EmployeeService } from '../../../services/employee.service';
import { Seat } from 'src/app/models/seat.model';
import { Employee } from 'src/app/models/employee.model';


@Component({
  selector: 'smart-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private tableService: TableService,
    private seatService: SeatService,
    private employeeService: EmployeeService
  ) { }

  tables: Table;
  seats: Seat;
  waiterList: any;
  waitersTable: any;
  modalRef: BsModalRef;
  stateTable: string;
  id: Partial<Table>;
  name: Partial<Table>;
  puestos: number;
  status: Partial<Table>;

  @ViewChildren('modalTable') modalTable: ElementRef;

  ngOnInit() {
   this.getAllTables();
   this.getSeatsAll();
  }

  getAllTables() {
    this.tableService.getAllTables().subscribe((res: any) => {
      this.tables = res.data.tables;
      this.cdr.detectChanges();
    });
  }

  getSeatsAll() {
    this.seatService.getSeatsAll().subscribe((res: any) => {
      this.seats = res.data.seat;
      this.cdr.detectChanges();
    });
  }


  puestoMesa(item) {
    if (item.status === 1 || item.status === true) {
      const seat = {
        id: item.id,
        table_id: item.table_id,
        name: item.name,
        status: false,
      };
      this.seatService.updateSeat(seat).subscribe((res: any) => {
        this.getAllTables();
        this.getSeatsAll();
        this.modalRef.hide();
        this.cdr.detectChanges();
      });
    }
    if (item.status === 0 || item.status === false) {
      const seat = {
        id: item.id,
        table_id: item.table_id,
        name: item.name,
        status: true,
      };
      this.seatService.updateSeat(seat).subscribe((res: any) => {
        this.getAllTables();
        this.getSeatsAll();
        this.modalRef.hide();
        this.cdr.detectChanges();
      });
    }

  }


  modalTableShow(estado: string, modalTable: TemplateRef<any>, id: Partial<Table>) {
    switch (estado) {
      case 'add':
        this.id = null,
        this.name = null,
        this.puestos = null,
        this.stateTable = 'add';
        this.modalRef = this.modalService.show(modalTable);
        break;
      case 'edit':
        this.stateTable = 'edit';
        this.id = id;
        this.name = this.tables.find((i: { id: Partial<Table>; }) => i.id === id).name;
        this.status = this.tables.find((i: { id: Partial<Table>; }) => i.id === id).status;
        this.puestos = (this.seats.filter((i: {table_id: Partial<Seat>; } ) => i.table_id === id )).length;
        this.employeeService.getWaiterAll().subscribe((res: any) => {
          this.waiterList = res.data.waiters;
          // this.waitersTable = this.waiterList.filter((i: { table_id: Partial<Seat>; }) => i.table_id === id);
          console.log(this.waiterList);
          this.cdr.detectChanges();
        });
        this.modalRef = this.modalService.show(modalTable);
        break;
      case 'elim':
        this.stateTable = 'elim';
        this.modalRef = this.modalService.show(modalTable, {class: 'modal-alert' });
        const e: any = document.getElementsByClassName('modal-dialog modal-alert')[0];
        e.children[0].classList.remove('modal-content');
        e.classList.remove('modal-dialog');
        e.classList.add('modal-alert');
        e.style.margin = '10% 0';
        break;
      default:
        break;
    }
  }

  ejectTable() {
    const table = {
      id: this.id,
      name: this.name,
      status: this.status
    };
    switch (this.stateTable) {
      case 'add':
        this.tableService.postTable(table).subscribe((res: any) => {
          const puesto = {
            table_id: res.data.table.id,
            name: this.puestos,
          };
          this.seatService.createSeat(puesto).subscribe((res2: any) => {
            this.getAllTables();
            this.getSeatsAll();
            this.modalRef.hide();
            this.cdr.detectChanges();
          });
        });
        break;
      case 'edit':
        this.tableService.updateTable(table).subscribe((res: any) => {
          const puesto = {
            table_id: res.data.table.id,
            name: this.puestos,
            seat_id: this.seats.filter((i: {table_id: Partial<Seat>; } ) => i.table_id === res.data.table.id ),
          };
          this.seatService.updateSeat(puesto).subscribe((res2: any) => {
            this.getAllTables();
            this.getSeatsAll();
            this.modalRef.hide();
            this.cdr.detectChanges();
          });
        });
        break;
      default:
        break;
    }
  }
}
