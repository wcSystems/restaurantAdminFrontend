import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-dropdown-user',
  templateUrl: './dropdown-user.component.html',
})
export class DropdownUserComponent {

  constructor(
    private router: Router
  ) { }

  user = {
    app: 'SmartAdmin',
    name: 'Dr. Codex Lantern',
    email: 'drlantern@gotbootstrap.com',
    avatar: 'avatar-admin.png',
  };

  logoutUser() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
