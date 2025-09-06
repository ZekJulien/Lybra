import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth-guard';

export enum AppRoutes {
  MAIN = '',
  AUTH = 'auth'
}

export const routes: Routes = [
  {
    path: AppRoutes.AUTH,
    loadChildren: () => import('./features/auths/auths.routes').then(r => r.authRoutes),
  },
  {
    path: AppRoutes.MAIN,
    loadComponent: () => import('./core/components/main/main').then(c => c.Main),
    loadChildren: () => import('./core/routes/main.routes').then(r => r.mainRoutes),
    canActivate: [authGuard]
  },
  {
    path: "**",
    redirectTo: AppRoutes.AUTH,
    pathMatch: 'full',
  }
];
