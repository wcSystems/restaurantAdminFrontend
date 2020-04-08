import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ElementRef, ViewChildren } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import { Job } from '../../../models/job.model';
import { Router } from '@angular/router';
import { JobService } from '../../../services/job.service';


@Component({
  selector: 'smart-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobListComponent implements OnInit {


  modalRef: BsModalRef;
  @ViewChildren('template') template: ElementRef;
  @ViewChildren('newJobClass') newJobClass: ElementRef;

  jobs: Job;
  id: any;
  name: any;
  status: any;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private jobService: JobService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getAllJob();
  }

  openModal(template: TemplateRef<any>, id: Partial<Job>) {
    this.modalRef = this.modalService.show(template);
    this.id = id;
    this.name = this.jobs.find((i: { id: Partial<Job>; }) => i.id === id).name;
    this.status = this.jobs.find((i: { id: Partial<Job>; }) => i.id === id).status;
  }

  modalJob(newJobClass: TemplateRef<any>) {
    this.modalRef = this.modalService.show(newJobClass);
  }

  createJob() {
    const job: Partial<Job> = {
      name: this.name
    };

    this.jobService.createJob(job).subscribe((res: any) => {
      this.jobList();
      this.modalRef.hide();
      this.getAllJob();
  });
  }

  updateJob() {
    const job: Partial<Job> = {
      id: this.id,
      name: this.name,
      status: this.status,
    };
    this.jobService.updateJob(job).subscribe((res: any) => {
        this.getAllJob();
        this.modalRef.hide();
        this.cdr.detectChanges();
    });
  }

  jobList() {
    this.router.navigate(['/jobs']);
  }

  getAllJob() {
    this.jobService.getJobsAll().subscribe((res: any) => {
      this.jobs = res.data.jobs;
      this.cdr.detectChanges();
    });
  }

}
