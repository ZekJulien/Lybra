import { Routes } from '@angular/router';

export enum MainPath {
  DASHBOARD = 'dashboard',
  AUTH = 'me',
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
    path: "**",
    redirectTo: MainPath.DASHBOARD,
    pathMatch: 'full',
  }
];
