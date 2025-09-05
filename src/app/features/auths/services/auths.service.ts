import {inject, Injectable, Injector, runInInjectionContext, Signal} from '@angular/core';
import {ConfigService} from '../../../core/services';
import {HttpClient} from '@angular/common/http';
import {Auth, Login} from '../models';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthsService {
  config = inject(ConfigService)
  http = inject(HttpClient)
  private injector = inject(Injector);
  private readonly apiURL = `${this.config.get_api_url()}/auth`

  login(data: Login): Signal<Auth | null> {
    return runInInjectionContext(this.injector, () =>
      toSignal(this.http.post<Auth>(`${this.apiURL}/token/`, data), {
        initialValue: null
      })
    );
  }



}


