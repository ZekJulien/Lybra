import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthStore } from '../../features/auths/stores/auth.store';

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authStore = inject(AuthStore);

  const accessToken = authStore.auth()?.access;
  const isRefreshRequest = req.url.includes('/auth/token/refresh/');
  const isLoginRequest = req.url.includes('/auth/token/') && !isRefreshRequest;

  const reqWithToken = !req.headers.has('X-Refresh-Attempted') && accessToken && !isRefreshRequest
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(reqWithToken).pipe(
    catchError((error: any) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isRefreshRequest &&
        !isLoginRequest &&
        !req.headers.has('X-Refresh-Attempted')
      ) {
        const retryReq = req.clone({ setHeaders: { 'X-Refresh-Attempted': 'true' } });

        return from(authStore.restoreSession()).pipe(
          switchMap((success: boolean) => {
            if (success) {
              const newAccessToken = authStore.auth()?.access;
              const newReq = retryReq.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken || ''}`,
                  'X-Refresh-Attempted': 'true'
                }
              });
              return next(newReq);
            } else {
              return throwError(() => new Error('Token refresh failed'));
            }
          })
        );
      }

      return throwError(() => error);
    })
  );
};

