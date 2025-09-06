import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auths/stores/auth.store';
import { LoadingService } from '../services/loading.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);
  const messageService = inject(MessageService);
  const loadingService = inject(LoadingService);

  if (authStore.isLoggedIn()) {
    return true;
  }

  loadingService.start();

  return authStore.restoreSession().then((success: boolean) => {
    loadingService.stop();

    if (success) {
      return true;
    } else {
      messageService.add({
        severity: 'warn',
        summary: 'Accès refusé',
        detail: 'Vous devez être connecté pour accéder à cette page.'
      });
      router.navigate(['/auth/login']).then();
      return false;
    }
  });
};

