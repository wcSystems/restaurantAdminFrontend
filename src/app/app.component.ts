import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'smart-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'smartadmin-angular-seed';
}
