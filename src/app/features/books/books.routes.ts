import { Routes } from '@angular/router';

export enum BookPath {
  MAIN = ''
}

export const bookRoutes: Routes = [
  {
    path: BookPath.MAIN,
    loadComponent: () => import('../books/pages/book/book').then(c => c.Book),
  },
  {
    path: "**",
    redirectTo: BookPath.MAIN,
    pathMatch: 'full',
  }
];
