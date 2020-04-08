import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../models/job.model';

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

    return this.http.get<Job[]>(`http://127.0.0.1:4000/api/job`, { headers } );
  }

  createJob(job) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Job[]>(`http://127.0.0.1:4000/api/job`, job, { headers } );
  }

  updateJob(job) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put<Job[]>(`http://127.0.0.1:4000/api/job`, job, { headers } );
  }
}
