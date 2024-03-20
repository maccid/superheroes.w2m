import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { breadcrumb: 'breadcrumb.home' },
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./features/heroes/heroes.routes').then((m) => m.routes),
    data: { breadcrumb: 'breadcrumb.hero.text' },
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
