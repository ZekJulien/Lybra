import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptorFn} from './core/interceptors/auth-interceptor';
import {providePrimeNG} from 'primeng/config';
import { LybraPreset } from './core/theme';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: LybraPreset,
        options: {
          darkModeSelector: '.dark',
        }
      },
      ripple: true,
    }),
    provideHttpClient(
      withInterceptors([authInterceptorFn])
    ),

  ]
};
