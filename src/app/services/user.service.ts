import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

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

    return this.http.get<User[]>(`http://127.0.0.1:4000/api/user`, { headers });
  }

  getUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });

    return this.http.get<User>(`http://127.0.0.1:4000/api/user/${id}`, {
      headers
    });
  }

  patchUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('bearer')
    });
    return this.http.patch(
      `http://127.0.0.1:4000/api/user/${id}`,
      { id },
      { headers }
    );
  }

  postLogin(userLogin: Partial<User>) {
    return this.http.post<User[]>(
      `http://127.0.0.1:4000/api/user/login`,
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

    return this.http.post<User[]>(`http://127.0.0.1:4000/api/user`, formData , {
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
 
    return this.http.put<User[]>(`http://127.0.0.1:4000/api/user`, formData, {
      headers
    });
  }
}
