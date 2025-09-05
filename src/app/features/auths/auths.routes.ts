import { Routes } from '@angular/router';
export enum AuthsPath {
  LOGIN = 'login'
}

export const authRoutes: Routes = [
  {
    path: AuthsPath.LOGIN,
    loadComponent: () => import('./pages/login/login').then(c => c.Login),
  },
  {
    path: "**",
    redirectTo: AuthsPath.LOGIN,
    pathMatch: 'full',
  }
];
