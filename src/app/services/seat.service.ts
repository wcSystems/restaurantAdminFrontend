import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seat } from '../models/seat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(
    private http: HttpClient
  ) { }

  getSeatsAll() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.get<Seat[]>(`${environment.domain}/seats`, { headers } );
  }

  createSeat(seat) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Seat[]>(`${environment.domain}/seats`, seat, { headers } );
  }

  updateSeat(seat) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put<Seat[]>(`${environment.domain}/seats`, seat, { headers } );
  }

}
