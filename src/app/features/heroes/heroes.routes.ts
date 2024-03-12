import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
    
export const routes: Routes = [{
    path: '',
    data: { breadcrumb: '' },
    children: [
        {
            path: '',
            component: IndexComponent,
            data: { breadcrumb: '' }
        },
        { 
            path: 'add', 
            loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent),
            data: { breadcrumb: 'Añadir Heroe' }
        },
        {
            path: 'edit/:id',
            loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent),
            data: { breadcrumb: 'Editar Heroe' }
        }
    ]
}];



