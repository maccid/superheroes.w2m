import { Routes } from '@angular/router';
 
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(mod => mod.HomeComponent)
      },
    { 
        path: 'heroes', 
        loadChildren: () => import('./features/characters/characters.routes').then(m => m.routes)
    },
    
    {
        path: '**',
        redirectTo: '',
        /*
        loadComponent: () => import('./page-not-found/page-not-found.component')
          .then(mod => mod.PageNotFoundComponent)
           */
      }
     
];



