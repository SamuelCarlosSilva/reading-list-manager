import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./modules/users/pages/user-list/user-list').then(c => c.UserList)
  },
  {
    path: 'users/new',
    loadComponent: () =>
      import('./modules/users/pages/user-form/user-form').then(c => c.UserForm)
  },
  {
    path: 'users/:id/edit',
    loadComponent: () =>
      import('./modules/users/pages/user-form/user-form').then(c => c.UserForm)
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
