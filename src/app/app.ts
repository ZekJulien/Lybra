import {Component, inject, OnInit} from '@angular/core';
import {PrimeNG} from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit{
  primeng = inject(PrimeNG)

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
