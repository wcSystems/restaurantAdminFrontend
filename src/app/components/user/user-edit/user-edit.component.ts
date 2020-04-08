import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params } from '@angular/router';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'smart-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  file: File;

  imgProfile: string | ArrayBuffer =
  'uploads/img/users/default.jpg';

    defaults: any = 'uploads/img/users/default.jpg';
    final: any;


  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  id: any;
  firstname: any;
  lastname: any;
  username: any;
  email: any;
  password: any;
  rol: any;
  status: boolean;

  roles: Role;
  // imgProfile: string;
  imageToUpload: File = null;

  hover: any;


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchUser(id);
    });
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


  getRolesAll() {
    this.roleService.getAllRoles().subscribe((res: any) => {
      this.roles = res.data.roles;
      this.cdr.detectChanges();
    });
  }



  fetchUser(id: string) {
    this.userService.getUser(id).subscribe((res: any)  => {
      this.id = res.data.user.id;
      this.firstname = res.data.user.firstname;
      this.lastname = res.data.user.lastname;
      this.username = res.data.user.username;
      this.email = res.data.user.email;
      this.rol = res.data.user.role_id;
      this.status = res.data.user.status;
      this.final = res.data.user.img_profile;
      this.cdr.detectChanges();
    });
  }

  editUserSend() {
    if (this.password === undefined) {
      this.password = '';
    }
    const user: Partial<User> = {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.rol,
      status: this.status,
      img_profile: this.final
    };

    console.log(this.final);
    this.userService.postEdit(user, this.imageToUpload).subscribe((res: any) => {
        this.toastr.success('Correcta', 'Edicion');
        this.UserList();
    });
  }

  UserList() {
    this.router.navigate(['/users']);
  }

}
