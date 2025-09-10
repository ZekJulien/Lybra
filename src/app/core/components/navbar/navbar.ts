import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {Menu} from 'primeng/menu';
import {MegaMenuItem, MenuItem} from 'primeng/api';
import {NavbarMenu, UserMenu} from '../../enums';
import {AuthStore} from '../../../features/auths/stores/auth.store';
import {AuthPath} from '../../../features/auths/auths.routes';
import {MainPath} from '../../routes/main.routes';
import {AppPath} from '../../../app.routes';
import {MegaMenu} from 'primeng/megamenu';
import {AuthorStore} from '../../../features/books/stores/author.store';
@Component({
  selector: 'app-navbar',
  imports: [
    Button,
    Menu,
    MegaMenu,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly MainRoutes = MainPath;
  protected readonly AppRoutes = AppPath;
  authStore = inject(AuthStore)
  authorStore = inject(AuthorStore)

  itemsMega: MegaMenuItem[] = [
    {
      label: NavbarMenu.DASHBOARD,
      icon: 'pi pi-microsoft',
      routerLink: [AppPath.MAIN, MainPath.DASHBOARD],
      routerLinkActiveOptions: 'activeItem',
    },
    {
      label: NavbarMenu.BOOK,
      icon: 'pi pi-book',
      routerLink: [AppPath.MAIN, MainPath.BOOK],
      command: () => {
        this.authorStore.get_by_id("ef210d29-c39c-4036-8d51-5b9c31c8ddec").then()
      }
    },
  ]

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
