import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth-guard';

export enum AppPath {
  MAIN = '',
  LOGIN = 'login'
}

export const routes: Routes = [
  {
    path: AppPath.LOGIN,
    loadComponent: () => import('./features/auths/pages/login/login').then(c => c.Login),
  },
  {
    path: AppPath.MAIN,
    loadComponent: () => import('./core/components/main/main').then(c => c.Main),
    loadChildren: () => import('./core/routes/main.routes').then(r => r.mainRoutes),
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: AppPath.LOGIN,
    pathMatch: 'full',
  }
];
