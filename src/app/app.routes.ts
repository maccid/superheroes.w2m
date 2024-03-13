import { Routes } from '@angular/router';
 
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent),
    data: { breadcrumb: 'Inicio' } 
  },
  { 
      path: 'heroes', 
      loadChildren: () => import('./views/heroes/heroes.routes').then(m => m.routes),
      data: { breadcrumb: 'Heroes' } 
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];



