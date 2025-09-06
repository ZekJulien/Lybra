import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from '../../features/auths/stores/auths.store';
import {LoadingService} from '../services/loading.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authStore = inject(AuthStore);
  const loadingService = inject(LoadingService);
  if (authStore.isLoggedIn()) {
    return true;
  }
  loadingService.start();
  return authStore.restoreSessionAsync().then(success => {
    loadingService.stop();
    if (success) {
      return true;
    } else {
      router.navigate(['/auth/login']);
      return false;
    }
  });
};
