import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ElementRef, ViewChildren } from '@angular/core';

import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { EmployeeService } from '../../../services/employee.service';
import { JobService } from '../../../services/job.service';
import { Employee } from 'src/app/models/employee.model';
import { Job } from 'src/app/models/job.model';
import { Router } from '@angular/router';



@Component({
  selector: 'smart-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeListComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private jobService: JobService,
    private router: Router,

  ) { }

  employees: Employee[] = [];
  jobs: Job[] = [];
  modalRef: BsModalRef;

  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  jobId: any;
  salary: any;
  status: any;



  @ViewChildren('template') template: ElementRef;
  @ViewChildren('newEmployeeClass') newEmployeeClass: ElementRef;

  ngOnInit() {
    this.getJobAll();
    this.getEmployeAll();

  }



  openModal(template: TemplateRef<any>, id: any) {
    this.id = id;
    this.firstName = this.employees.find(i => i.id === id).firstname;
    this.lastName = this.employees.find(i => i.id === id).lastname;
    this.email = this.employees.find(i => i.id === id).email;
    this.phone = this.employees.find(i => i.id === id).phone;
    this.jobId = this.employees.find(i => i.id === id).job_id;
    this.salary = this.employees.find(i => i.id === id).salary;
    this.status = this.employees.find(i => i.id === id).status;
    this.modalRef = this.modalService.show(template);
  }

  getEmployeAll() {
    this.employeeService.getEmployeeAll().subscribe((res: any) => {
      this.employees = res.data.employee;
      this.cdr.detectChanges();
    });
  }


  updateEmployee(id) {
    const employee: Partial<Employee> = {
      id: this.id,
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      phone: this.phone,
      job_id: this.jobId,
      salary: this.salary,
      status: this.status
    };

    this.employeeService.updateEmployee(employee).subscribe((res: any) => {
      this.getEmployeAll();
      this.modalRef.hide();
      this.cdr.detectChanges();
  });
  }

  createEmployee() {
    const trabajo = this.jobs.find(i => i.name === this.jobId);
    if (trabajo) {
      const employee: Partial<Employee> = {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        phone: this.phone,
        job_id: this.jobs.find(i => i.name === this.jobId).id,
        salary: this.salary
      };
      this.employeeService.createEmployee(employee).subscribe((res: any) => {
        this.getJobAll();
        this.getEmployeAll();
        this.employeeList();
        this.cdr.detectChanges();
        this.modalRef.hide();
      });
    } else {
      const job: Partial<Job> = {
        name: this.jobId
      };
      this.jobService.createJob(job).subscribe((res: any) => {
        const employee: Partial<Employee> = {
          firstname: this.firstName,
          lastname: this.lastName,
          email: this.email,
          phone: this.phone,
          job_id: res.data.job.id,
          salary: this.salary
        };
        this.employeeService.createEmployee(employee).subscribe((res2: any) => {
          this.getJobAll();
          this.getEmployeAll();
          this.employeeList();
          this.cdr.detectChanges();
          this.modalRef.hide();
        });
      });
    }


  }

  getJobAll() {
    this.jobService.getJobsAll().subscribe((res: any) => {
      this.jobs = res.data.jobs;
      this.cdr.detectChanges();
    });
  }

  modalEmployee(newEmployeeClass: TemplateRef<any>) {

    this.modalRef = this.modalService.show(newEmployeeClass);
    this.cdr.detectChanges();

    ($('.selectAdd') as any ).select2(
      {
          allowClear: true,
          placeholder: 'Seleccione una opcion'
      });
  }

  employeeList() {
    this.router.navigate(['/employees']);
  }

}
