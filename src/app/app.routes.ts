import { Routes } from '@angular/router';
 
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  { 
      path: 'heroes', 
      loadChildren: () => import('./features/heroes/heroes.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: '',
  }
];



