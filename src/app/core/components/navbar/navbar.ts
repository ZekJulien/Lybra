import {Component} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MainRoutes} from '../../routes/main.routes';
import {AppRoutes} from '../../../app.routes';

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
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly MainRoutes = MainRoutes;
  protected readonly AppRoutes = AppRoutes;
}
