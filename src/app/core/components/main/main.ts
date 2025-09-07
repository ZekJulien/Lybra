import {Component, inject} from '@angular/core';
import {Navbar} from "../navbar/navbar";
import {RouterOutlet} from "@angular/router";
import {MainPath} from '../../routes/main.routes';

@Component({
  selector: 'app-main',
    imports: [
        Navbar,
        RouterOutlet
    ],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  private readonly MainRoutes= MainPath;
}
