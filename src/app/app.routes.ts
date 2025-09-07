import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth-guard';

export enum AppRoutes {
  MAIN = '',
  LOGIN = 'login'
}

export const routes: Routes = [
  {
    path: AppRoutes.LOGIN,
    loadComponent: () => import('./features/auths/pages/login/login').then(c => c.Login),
  },
  {
    path: AppRoutes.MAIN,
    loadComponent: () => import('./core/components/main/main').then(c => c.Main),
    loadChildren: () => import('./core/routes/mainPath').then(r => r.mainRoutes),
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: AppRoutes.LOGIN,
    pathMatch: 'full',
  }
];
