import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'smart-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) {}

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  rol: string;
  status: boolean;
  roles: Role;

  file: File;
  imageToUpload: File;

  imgProfile: string | ArrayBuffer =
  'uploads/img/users/default.jpg';

    defaults: any = 'uploads/img/users/default.jpg';
    final: any;

  CreateUserSend() {

    const user: Partial<User> = {
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.rol
    };

    this.userService.postCreate(user, this.imageToUpload).subscribe((res: any) => {
        this.toastr.success('Correcta', 'Creacion');
        this.UserList();
   
    });
  }

  ngOnInit() {
    this.getRolesAll();
  }




  onChange(file: File) {
    if (file) {
      this.imageToUpload = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imgProfile = reader.result;
        this.final = reader.result;
        this.cdr.detectChanges();
      };
    }
  }


  UserList() {
    this.router.navigate(['/users']);
  }


  getRolesAll() {
    this.roleService.getAllRoles().subscribe((res: any) => {
      this.roles = res.data.roles;
      this.cdr.detectChanges();
    });
  }



}
