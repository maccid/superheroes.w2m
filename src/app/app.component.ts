import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  template: `
    <app-loader></app-loader>
    <app-header></app-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main> 
    `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {
}
