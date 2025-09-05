import {Component, inject} from '@angular/core';
import {AuthStore} from '../../stores/auths.store';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SharedFormError } from '../../../../shared/components/form-error/form-error';

@Component({
  selector: 'app-login',
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    CardModule,
    InputText,
    ButtonDirective,
    ButtonLabel,
    ReactiveFormsModule,
    MessageModule,
    SharedFormError
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  authsStore = inject(AuthStore);
  formBuilder = inject(FormBuilder);

  formLogin = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required]),
    }
  )

  onSubmit(){
    if (!this.formLogin.valid){
      this.formLogin.markAllAsTouched();
      this.formLogin.markAllAsDirty();
      return
    }
    const from_value = this.formLogin.value;
    if(
      from_value.email !== undefined && from_value.password !== undefined
      &&
      from_value.password !== null && from_value.email !== null
    ){
      this.authsStore.login({
        email : from_value.email,
        password : from_value.password
      })
    }
  }
}
