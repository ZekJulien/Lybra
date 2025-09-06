import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthStore } from '../../features/auths/stores/auths.store';

export const authInterceptorFn: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authStore = inject(AuthStore);

  const accessToken = authStore.auth()?.access;
  const isRefreshRequest = req.url.includes('/auth/token/refresh');
  const reqWithToken = !req.headers.has('X-Refresh-Attempted') && accessToken && !isRefreshRequest
    ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : req;

  return next(reqWithToken).pipe(
    catchError((error: any) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/auth/token/refresh') &&
        !req.headers.has('X-Refresh-Attempted')
      ) {
        const refreshReq = req.clone({ setHeaders: { 'X-Refresh-Attempted': 'true' } });

        return from(authStore.restoreSessionAsync()).pipe(
          switchMap((success: boolean) => {
            if (success) {
              const newAccessToken = authStore.auth()?.access;
              const newClonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken || ''}`,
                  'X-Refresh-Attempted': 'true'
                }
              });
              return next(newClonedRequest);
            } else {
              // I will add logout here after do this
              return throwError(() => new Error('Token refresh is backlist'));
            }
          })
        );
      }
      return throwError(() => error);
    })
  );
};
