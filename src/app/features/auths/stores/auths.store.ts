import {Injectable, signal, computed, effect, inject, Injector, runInInjectionContext, EffectRef} from '@angular/core';
import {Auth, Login} from '../models';
import {AuthsService} from '../services';
import {Router} from '@angular/router';
import {AppRoutes} from '../../../app.routes';
import {MainRoutes} from '../../../core/routes/main.routes';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authsService = inject(AuthsService)
  private effectRef: EffectRef | null = null

  private router = inject(Router)
  private injector = inject(Injector);
  readonly auth = signal<Auth | null>(null);
  readonly isLoggedIn = computed(() => !!this.auth()?.access);

  login(data: Login) {
    if (this.effectRef) {
      this.effectRef.destroy();
    }
    const loginSignal = this.authsService.login(data);
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const result = loginSignal();
        if (result) {
          this.auth.set(result);
          localStorage.setItem('refresh', result.refresh);
          this.router.navigate([AppRoutes.MAIN, MainRoutes.DASHBOARD]).then();
        }
      }, { manualCleanup: true } );
    });
  }

  restoreSessionAsync(): Promise<boolean> {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      return Promise.resolve(false);
    }

    const signal = this.authsService.refresh(refresh);

    return new Promise(resolve => {
      runInInjectionContext(this.injector, () => {
        const stop: EffectRef = effect(() => {
          const result = signal();
          if (result !== null) {
            this.auth.set(result);
            localStorage.setItem('refresh', result.refresh);
            resolve(true);
            stop.destroy();
          }
        });

        setTimeout(() => {
          stop.destroy();
          resolve(false);
        }, 3000);
      });
    });
  }

}
