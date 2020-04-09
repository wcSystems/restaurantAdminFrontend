import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(
    private http: HttpClient
  ) { }

  getJobsAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.get<Job[]>(`${environment.domain}/job`, { headers } );
  }

  createJob(job) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Job[]>(`${environment.domain}/job`, job, { headers } );
  }

  updateJob(job) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put<Job[]>(`${environment.domain}/job`, job, { headers } );
  }
}
