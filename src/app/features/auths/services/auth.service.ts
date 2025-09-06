import { inject, Injectable, signal } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Auth, Login} from '../models';
import { ConfigService } from '../../../core/services';
import {AsyncState} from '../../../core/models';

@Injectable({ providedIn: 'root' })
export class authService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly apiURL = `${this.config.get_api_url()}/auth`;

  readonly authState = signal<AsyncState<Auth>>({
    data: null,
    loading: false,
    error: null,
    response: null,
  });

  private _loadingState(): void {
    this.authState.update(s => ({ ...s, loading: true, error: null, response: null }));
  }

  login(data: Login): void {
    this._loadingState();
    this.http.post<Auth>(`${this.apiURL}/token/`, data).subscribe(
      {
        next: data => this.authState.set({ data, loading: false, error: null, response: null }),
        error: error => this.authState.set({ data: null, loading: false, error, response: null }),
      }
    )
  }

  logout(refreshToken: string): void {
    this._loadingState();
    this.http.post<HttpResponse<any>>(`${this.apiURL}/logout/`, { refresh: refreshToken }, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this.authState.set({ data: null, loading: false, error: null, response});
        },
        error: (error) => {
          this.authState.set({ data: null, loading: false, error, response: null });
        }
      });
  }

  refresh(refreshToken: string): void {
    this._loadingState();

    this.http.post<Auth>(`${this.apiURL}/token/refresh/`, { refresh: refreshToken }).subscribe({
      next: data   => this.authState.set({ data, loading: false, error: null, response: null }),
      error: error => this.authState.set({ data: null, loading: false, error, response: null }),
    });
  }
}
