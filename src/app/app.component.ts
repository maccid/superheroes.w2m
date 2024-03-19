import { Component, OnInit, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './shared/layout/header/header.component';
import { LoaderComponent } from './shared/layout/loader/loader.component';
import { ToolbarComponent } from './shared/layout/toolbar/toolbar.component';

import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ToolbarComponent, LoaderComponent],
  template: `
    <app-loader></app-loader>
    <app-header></app-header>
    <main class="content">
      <app-toolbar></app-toolbar>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly _translateService = inject(LanguageService);

  ngOnInit(): void {
    this._translateService.setLangs();
    this._translateService.setLang();
  }
}
