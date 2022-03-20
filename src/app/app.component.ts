import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div class="d-flex flex-column align-items-stretch h-100">
    <nav class="navbar w-100 navbar-dark bg-dark">
      <a class="navbar-brand" routerLink="/">
        <img
          src="https://angular.io/assets/images/logos/angular/shield-large.svg"
          width="30"
          height="30"
          [alt]="title"
        />
      </a>
    </nav>
    <router-outlet></router-outlet>
  </div>`,
  styles: [],
})
export class AppComponent {
  title = 'example-angular-crud';
}
