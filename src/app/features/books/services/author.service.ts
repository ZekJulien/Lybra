import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AsyncState} from '../../../core/models';
import {setData, setError, setInit, setLoading} from '../../../core/helpers/async-state.helpers';
import {ConfigService} from '../../../core/services';
import {Author} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  http = inject(HttpClient);
  config = inject(ConfigService);
  readonly authorState = signal<AsyncState<Author>>(setInit<Author>());
  private readonly apiURL = `${this.config.get_api_url()}/book/author/`

  private _setLoadingState() {
    setLoading<Author>(this.authorState)
  }

  get_by_id(id : string) {
    this._setLoadingState();

    this.http.get<Author>(`${this.apiURL+id+'/'}`).subscribe({
      next: data => {setData<Author>(this.authorState, data);},
      error: err => {setError<Author>(this.authorState, err)}
    })
  }
}
