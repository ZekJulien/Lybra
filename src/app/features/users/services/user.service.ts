import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.interface';
import {AsyncState} from '../../../core/models';
import {setData, setError, setInit, setLoading} from '../../../core/helpers/async-state.helpers';
import {ConfigService} from '../../../core/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private config = inject(ConfigService);
  private http = inject(HttpClient);
  readonly userState = signal<AsyncState<User>>(setInit<User>())
  private readonly apiURL = `${this.config.get_api_url()}/user`

  private _setLoadingState(){
    setLoading<User>(this.userState)
  }

  get(){
    this._setLoadingState();
    this.http.get<User>(`${this.apiURL}/get/`).subscribe({
      next: data => {setData<User>(this.userState, data)},
      error: error => {setError<User>(this.userState, error)}
    })
  }
}
