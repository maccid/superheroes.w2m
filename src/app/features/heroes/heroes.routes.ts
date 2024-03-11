import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
    
export const routes: Routes = [{
    path: '',
    children: [
        {
            path: '',
            component: IndexComponent
        },
        { 
            path: 'add', 
            loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent)
        },
        {
            path: 'edit/:id',
            loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent)
        }
    ]
}];



