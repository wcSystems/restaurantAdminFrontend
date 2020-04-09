import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAllUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    return this.http.get<User[]>(`${environment.domain}/users`, { headers });
  }

  getUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    return this.http.get<User>(`${environment.domain}/users/${id}`, {
      headers
    });
  }

  patchUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return this.http.patch(
      `${environment.domain}/users/${id}`,
      { id },
      { headers }
    );
  }

  postLogin(userLogin: Partial<User>) {
    return this.http.post<User[]>(
      `${environment.domain}/users/login`,
      userLogin
    );
  }

  postCreate(user: any, image: File) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }else {
      formData.append('img_profile', user.img_profile);
    }

    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role_id', user.role_id);
    formData.append('password', user.password);

    return this.http.post<User[]>(`${environment.domain}/users`, formData , {
      headers
    });
  }

  postEdit(user: any, image: File) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
    
    formData.append('id', user.id);
    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role_id', user.role_id);
    formData.append('status', user.status);
    formData.append('img_profile', user.img_profile);
 
    return this.http.put<User[]>(`${environment.domain}/users`, formData, {
      headers
    });
  }
}
