import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Seat } from '../models/seat.model';

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

    return this.http.get<Seat[]>(`http://127.0.0.1:4000/api/seat`, { headers } );
  }

  createSeat(seat) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.post<Seat[]>(`http://127.0.0.1:4000/api/seat`, seat, { headers } );
  }

  updateSeat(seat) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + localStorage.getItem('bearer')
    });

    return this.http.put<Seat[]>(`http://127.0.0.1:4000/api/seat`, seat, { headers } );
  }

}
