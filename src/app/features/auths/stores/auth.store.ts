import {
  Injectable,
  computed,
  effect,
  inject,
} from '@angular/core';
import {Auth, Login} from '../models';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';
import { MainPath } from '../../../core/routes/mainPath';
import { MessageService } from 'primeng/api';
import { LoadingService } from '../../../core/services/loading.service';
import {authService} from '../services';
import {AsyncHelpersService} from '../../../core/helpers';
import {AsyncState} from '../../../core/models';
import {ToastDetail, ToastSummary} from '../../../core/enums';
import {AuthToast} from '../enums';
import {AuthInfo} from '../models/auth-info.interface';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private authService     = inject(authService);
  private router      = inject(Router);
  private toast       = inject(MessageService);
  private loadingService  = inject(LoadingService);
  private asyncHelpers = inject(AsyncHelpersService)

  readonly authState  = this.authService.authState;
  readonly authInfoState  = this.authService.authInfoState;
  readonly auth       = computed(() => this.authState().data);
  readonly authInfo       = computed(() => this.authInfoState().data);
  readonly isLoggedIn = computed(() => !!this.auth()?.access);

  constructor() {
    effect(() => {
      this.authState().loading || this.authInfoState().loading
        ? this.loadingService.start()
        : this.loadingService.stop();
    });
  }
  //region Auth
  private waitForSettledAuthState  = (): Promise<AsyncState<Auth>> =>
    this.asyncHelpers.waitForSettled(() => this.authState());

  async login(data: Login): Promise<boolean> {
    const settle = this.waitForSettledAuthState();
    this.authService.login(data);
    const { data: auth, error } = await settle;
    if (auth) {
      localStorage.setItem('refresh', auth.refresh);
      await this.router.navigate([AppRoutes.MAIN, MainPath.DASHBOARD]);
      this.toast.add({
        severity: 'success',
        summary: ToastSummary.SUCCESS,
        detail: 'Bienvenue !'
      });
      return true;
    }

    this.toast.add({
      severity: 'error',
      summary:  'Erreur de connexion',
      detail:   (error?.message.detail as string) || 'Email ou mot de passe incorrect.'
    });
    return false;
  }

  async restoreSession(): Promise<boolean> {
    const token = localStorage.getItem('refresh');
    if (!token) return false;

    const settle = this.waitForSettledAuthState();
    this.authService.refresh(token);
    const { data: auth, error } = await settle;

    if (auth) {
      localStorage.setItem('refresh', auth.refresh);
      return true;
    }

    this.toast.add({
      severity: 'error',
      summary:  'Session expirée',
      detail:   (error?.message as string) || 'Reconnectez-vous.'
    });
    return false;
  }

  async logout(): Promise<boolean> {
    const token = localStorage.getItem('refresh');
    if (!token) return false;

    const settle = this.waitForSettledAuthState();
    this.authService.logout(token);
    const { response: response, error } = await settle;

    if (response) {
      localStorage.clear();
      this.toast.add({
        severity: 'success',
        summary:  ToastSummary.SUCCESS,
        detail:   (error?.message as string) || AuthToast.LOGOUT_SUCCESS
      });
      this.router.navigate([AppRoutes.LOGIN]).then();
      return true;
    }
    this.toast.add({
      severity: 'error',
      summary:  ToastSummary.ERROR,
      detail:   (error?.message as string) || ToastDetail.DEFAULT_ERROR
    });
    return false;
  }
  //endregion

  //region AuthInfo
  private waitForSettledAuthInfoState  = (): Promise<AsyncState<AuthInfo>> =>
    this.asyncHelpers.waitForSettled(() => this.authInfoState());

  async getMe() : Promise<boolean>{
    const settle = this.waitForSettledAuthInfoState();
    this.authService.getMe();
    const { data: authInfo, error } = await settle;
    if(authInfo){
      return true
    }

    this.toast.add({
      severity: 'error',
      summary: ToastSummary.ERROR,
      detail: ToastDetail.DEFAULT_ERROR
    });
    return false;
  }
  //endregion

}
