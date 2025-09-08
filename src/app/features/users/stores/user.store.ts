import {computed, effect, inject, Injectable} from '@angular/core';
import {UserService} from '../services/user.service';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncState} from '../../../core/models';
import {Auth} from '../../auths/models';
import {AsyncHelpersService} from '../../../core/helpers';
import {User} from '../models/user.interface';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ToastDetail, ToastSummary} from '../../../core/enums';

@Injectable({ providedIn: 'root' })
export class UserStore{
  private userService = inject(UserService);
  private loadingService = inject(LoadingService);
  private toast = inject(MessageService);
  userState = this.userService.userState
  user = computed(() => this.userService.userState().data)
  private asyncHelpers = inject(AsyncHelpersService)

  constructor() {
    effect(() => {
      this.userState().loading
        ? this.loadingService.start()
        : this.loadingService.stop();

      if(this.userState().error){
        this.toast.add({
          severity: 'error',
          summary: ToastSummary.ERROR,
          detail: ToastDetail.DEFAULT_ERROR,
        });
      }
    });
  }

  private waitForSettledUserState  = (): Promise<AsyncState<User>> =>
    this.asyncHelpers.waitForSettled(() => this.userState());

  async get(){
    const settle = this.waitForSettledUserState()
    this.userService.get()
    const res : AsyncState<User> = await settle
    return !!res;
  }
}
