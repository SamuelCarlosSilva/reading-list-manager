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
    path: 'books',
    loadComponent: () =>
      import('./modules/books/pages/book-list/book-list').then(m => m.BookList)
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('./modules/books/pages/book-form/book-form').then(m => m.BookForm)
  },
  {
    path: 'books/:id/edit',
    loadComponent: () =>
      import('./modules/books/pages/book-form/book-form').then(m => m.BookForm)
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];
