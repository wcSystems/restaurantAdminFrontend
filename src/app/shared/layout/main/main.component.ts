import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { mobileNavigation } from 'src/app/store/navigation';
import { APP_CONFIG } from 'src/app/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'smart-main',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  app = APP_CONFIG.app;

  constructor(private router: Router, private store: Store<any>) {}

  ngOnInit(): void {
    this.main();
  }

  main() {
    if (localStorage.getItem('bearer') === null) {
      this.router.navigate(['/login']);
    }
  }

  closeMobileNav($event: MouseEvent) {
    $event.preventDefault();
    this.store.dispatch(mobileNavigation({ open: false }));
  }
}
