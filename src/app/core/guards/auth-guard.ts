import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthStore} from '../../features/auths/stores/auths.store';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authStore = inject(AuthStore);
  if (authStore.isLoggedIn()) {
    return true;
  }
  router.navigate(['/auth/login']).then();
  return false;
};
