import { Routes } from '@angular/router';

export enum MainPath {
  DASHBOARD = 'dashboard',
  AUTH = 'me',
  BOOK = 'book',
}

export const mainRoutes: Routes = [
  {
    path: MainPath.DASHBOARD,
    loadComponent: () => import('../components/dashboard/dashboard').then(c => c.Dashboard),
  },
  {
    path: MainPath.AUTH,
    loadChildren: () => import('../../features/auths/auths.routes').then(r => r.authRoutes)
  },
  {
    path: MainPath.BOOK,
    loadChildren: () => import('../../features/books/books.routes').then(r => r.bookRoutes)
  },
  {
    path: "**",
    redirectTo: MainPath.DASHBOARD,
    pathMatch: 'full',
  }
];
