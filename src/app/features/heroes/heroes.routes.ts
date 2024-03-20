import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: '' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/index/index.component').then((m) => m.IndexComponent),
        data: { breadcrumb: '' },
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./pages/edit/edit.component').then((m) => m.EditComponent),
        data: { breadcrumb: 'breadcrumb.hero.add' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/edit/edit.component').then((m) => m.EditComponent),
        data: { breadcrumb: 'breadcrumb.hero.edit' },
      },
    ],
  },
];
