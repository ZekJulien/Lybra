import { Routes } from '@angular/router';
export enum AuthPath {
  LOGIN = 'login',
  PROFILE = 'profile'
}

export const authRoutes: Routes = [
  {
    path: AuthPath.LOGIN,
    loadComponent: () => import('./pages/login/login').then(c => c.Login),
  },
  {
    path: AuthPath.PROFILE,
    loadComponent: () => import('./pages/profile/profile').then(c => c.Profile),
  },
  {
    path: "**",
    redirectTo: AuthPath.LOGIN,
    pathMatch: 'full',
  }
];
