import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'smart-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  usuario: any;
  clave: any;

  ngOnInit() {}



  fetchUser() {
    this.userService.getUser('4').subscribe(res => {
      console.log(res);
    });
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  loginUser() {
    const userLogin: Partial<User> = {
      email: this.usuario,
      password: this.clave
    };

    this.userService.postLogin(userLogin).subscribe((res: any) => {

      if (res.error === 0) {
        this.toastr.success(this.usuario, 'Bienvenido');
        localStorage.setItem('bearer', res.data.token);
        this.router.navigate(['/dashboard']);
      }
      if (res.error === 1) {
        this.toastr.error('Usuario o Contraseña Erronea', 'Error');
      }
    });
  }
}
