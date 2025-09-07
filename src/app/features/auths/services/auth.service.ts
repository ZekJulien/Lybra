import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Auth, Login} from '../models';
import { ConfigService } from '../../../core/services';
import {AsyncState} from '../../../core/models';
import {AuthInfo} from '../models/auth-info.interface';
import {setData, setError, setLoading, setResponse} from '../../../core/helpers/async-state.helpers';

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

  readonly authInfoState = signal<AsyncState<AuthInfo>>({
    data: null,
    loading: false,
    error: null,
    response: null,
  });

  private _loadingAuthState(): void{
    setLoading<Auth>(this.authState);
  }
  private _loadingAuthInfoState(): void{
    setLoading<AuthInfo>(this.authInfoState);
  }

  login(data: Login): void {
    this._loadingAuthState();
    this.http.post<Auth>(`${this.apiURL}/token/`, data).subscribe(
      {
        next: data => setData<Auth>(this.authState, data),
        error: error => setError<Auth>(this.authState, error),
      }
    )
  }

  getMe(): void{
    this._loadingAuthInfoState();
    this.http.get<AuthInfo>(`${this.apiURL}/me/`).subscribe(
      {
        next: data => setData<AuthInfo>(this.authInfoState, data),
        error: error => setError<AuthInfo>(this.authInfoState, error),
      }
    )
  }

  logout(refreshToken: string): void {
    this._loadingAuthState();
    this.http.post<HttpResponse<any>>(`${this.apiURL}/logout/`, { refresh: refreshToken }, { observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          setResponse<Auth>(this.authState, response);
        },
        error: (error) => {
          setError<Auth>(this.authState, error);
        }
      });
  }

  refresh(refreshToken: string): void {
    this._loadingAuthState();

    this.http.post<Auth>(`${this.apiURL}/token/refresh/`, { refresh: refreshToken }).subscribe({
      next: data   => setData<Auth>(this.authState, data),
      error: error => setError<Auth>(this.authState, error),
    });
  }
}
