import {Component, inject, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {SharedFormError} from '../../../../shared';
import {AuthStore} from '../../stores/auth.store';
import {DatePipe, JsonPipe} from '@angular/common';
import {Chip} from 'primeng/chip';
import {AuthEnum, AuthRole} from '../../enums';

@Component({
  selector: 'app-auth-info',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Chip,
    DatePipe
  ],
  templateUrl: './auth-info.html',
  styleUrl: './auth-info.scss'
})
export class AuthInfo implements OnInit {
  protected readonly AuthEnum = AuthEnum;
  authStore = inject(AuthStore);

  ngOnInit(): void {
    if(!this.authStore.authInfo()) this.authStore.getMe().then();
  }

  protected readonly AuthRole = AuthRole;
}
