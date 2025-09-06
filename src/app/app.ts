import {Component, inject} from '@angular/core';
import { RouterOutlet} from '@angular/router';
import {LoadingService} from './core/services/loading.service';
import { ProgressBarModule } from 'primeng/progressbar';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProgressBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly loadingService= inject(LoadingService);
}
