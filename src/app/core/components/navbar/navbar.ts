import {Component, inject} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MainPath} from '../../routes/mainPath';
import {AppRoutes} from '../../../app.routes';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {UserMenu} from '../../enums';
import {AuthStore} from '../../../features/auths/stores/auth.store';
import {AuthPath} from '../../../features/auths/auths.routes';
@Component({
  selector: 'app-navbar',
  imports: [
    Toolbar,
    Button,
    IconField,
    InputIcon,
    InputText,
    RouterLink,
    RouterLinkActive,
    Menu,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly MainRoutes = MainPath;
  protected readonly AppRoutes = AppRoutes;
  authStore = inject(AuthStore);

  items : MenuItem[] = [
    {
      label: UserMenu.PROFILE,
      icon: 'pi pi-user',
      routerLink: [MainPath.AUTH, AuthPath.PROFILE],
    },
    {
      label: UserMenu.LOGOUT,
      icon: 'pi pi-sign-out',
      command : () => {
        this.authStore.logout().then();
      },
    },
  ];
}
