import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, ElementRef, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ToastrService } from 'ngx-toastr';

import { BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'smart-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {

  @ViewChildren('template') template: ElementRef;

  users: User[] = [];
  modalRef: BsModalRef;
  constructor(
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}



  ngOnInit() {
      this.fetchUser();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-alert' });
    const e: any = document.getElementsByClassName('modal-dialog modal-alert')[0];
    e.children[0].classList.remove('modal-content');
    e.classList.remove('modal-dialog');
    e.classList.add('modal-alert');
    e.style.margin = '10% 0';
  }

  userDelete(i, id) {
    this.userService.patchUser(id).subscribe((res: any)  => {
      this.users.splice(i, 1);
      this.modalRef.hide();
      this.toastr.success('Correcta', 'Eliminacion');
      this.cdr.detectChanges();
    });

  }

  fetchUser() {
    this.userService.getAllUsers().subscribe((user: any) => {
      this.users = user.data.users;
      this.cdr.detectChanges();
    });
  }

  UserCreate() {
    this.router.navigate(['/users/create']);
  }


  UserEdit(i: string, id: string) {
    this.router.navigate([`/users/edit/${id}`]);
  }


}
