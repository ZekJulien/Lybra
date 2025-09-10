import {computed, effect, inject, Injectable} from '@angular/core';
import {AuthorService} from '../services/author.service';
import {ToastDetail, ToastSummary} from '../../../core/enums';
import {LoadingService} from '../../../core/services/loading.service';
import {MessageService} from 'primeng/api';
import {AsyncState} from '../../../core/models';
import {AsyncHelpersService} from '../../../core/helpers';
import {Author} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthorStore {
  authorService = inject(AuthorService);
  loadingService = inject(LoadingService);
  asyncHelper = inject(AsyncHelpersService);
  toast = inject(MessageService);
  authorState = this.authorService.authorState;
  author = computed(() => this.authorState().data);

  constructor() {
    effect(() => {
      this.authorState().loading
        ? this.loadingService.start()
        : this.loadingService.stop();

      if(this.authorState().error){
        this.toast.add({
          severity: 'error',
          summary: ToastSummary.ERROR,
          detail: ToastDetail.DEFAULT_ERROR,
        });
  }})
  };

  private waitForSettledUserState  = (): Promise<AsyncState<Author>> =>
    this.asyncHelper.waitForSettled(() => this.authorState());

  async get_by_id(id : string): Promise<boolean> {
    const settle = this.waitForSettledUserState()
    this.authorService.get_by_id(id)
    const res : AsyncState<Author> = await settle
    return !!res;
  }

}
