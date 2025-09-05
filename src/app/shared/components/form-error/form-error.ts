import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import { MessageModule } from 'primeng/message';


@Component({
  selector: 'shared-form-error',
  imports: [MessageModule],
  templateUrl: './form-error.html',
  styleUrl: './form-error.scss'
})
export class SharedFormError {
  @Input() control: AbstractControl | null = null;

  get errorMessages(): string[] {
    if (!this.control || !this.control.errors) return [];

    const errors = this.control.errors;
    const messages: string[] = [];

    if (errors['required']) messages.push('Ce champ est requis.');
    if (errors['email']) messages.push('Format d’email invalide.');
    if (errors['minlength']) messages.push(`Minimum ${errors['minlength'].requiredLength} caractères.`);
    if (errors['maxlength']) messages.push(`Maximum ${errors['maxlength'].requiredLength} caractères.`);
    if (errors['pattern']) messages.push('Format invalide.');
    if (errors['custom']) messages.push(errors['custom']);

    return messages;
  }
}
