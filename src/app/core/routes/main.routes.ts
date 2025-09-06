import { Routes } from '@angular/router';

export enum MainRoutes {
  DASHBOARD = 'dashboard',
}

export const mainRoutes: Routes = [
  {
    path: MainRoutes.DASHBOARD,
    loadComponent: () => import('../components/dashboard/dashboard').then(c => c.Dashboard),
  },
  {
    path: "**",
    redirectTo: MainRoutes.DASHBOARD,
    pathMatch: 'full',
  }
];
