import {
  Injectable,
  Injector,
  runInInjectionContext,
  effect,
  EffectRef, inject
} from '@angular/core';
import {AsyncState} from '../models';

@Injectable({ providedIn: 'root' })
export class AsyncHelpersService {
  injector = inject(Injector);

  waitForSettled<T>(
    read: () => AsyncState<T>
  ): Promise<AsyncState<T>> {
    return new Promise(resolve => {
      runInInjectionContext(this.injector, () => {
        const ref: EffectRef = effect(
          () => {
            const s = read();
            if (!s.loading && (s.data !== null || s.error !== null || s.response !== null)) {
              ref.destroy();
              resolve(s);
            }
          },
          { manualCleanup: true }
        );
      });
    });
  }
}
