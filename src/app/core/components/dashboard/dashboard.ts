import {Component, inject} from '@angular/core';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  imports: [

  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  toastservice = inject(MessageService);

  show(){
    this.toastservice.add({ severity: 'error', summary: 'Danger', detail: 'Message Content', life: 3000 });
  }
}
