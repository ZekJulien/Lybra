import {Injectable, signal, computed, effect, inject, Injector, runInInjectionContext, EffectRef} from '@angular/core';
import {Auth, Login} from '../models';
import {AuthsService} from '../services';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly authsService = inject(AuthsService)
  private effectRef: EffectRef | null = null

  private injector = inject(Injector);
  private auth = signal<Auth | null>(null);
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
        }
      }, { manualCleanup: true } );
    });
  }

}
