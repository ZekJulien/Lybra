import {Component, inject, OnInit} from '@angular/core';
import {UserStore} from '../../stores/user.store';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {UserEnum, UserForm} from '../../enums';
import {Fieldset} from 'primeng/fieldset';
import {Button} from 'primeng/button';
import {Menu} from '../../../../core/enums';
import {ProgressSpinner} from 'primeng/progressspinner';


@Component({
  selector: 'app-user-info',
  imports: [
    InputGroup,
    InputGroupAddon,
    InputText,
    ReactiveFormsModule,
    Fieldset,
    Button,
    ProgressSpinner
  ],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss'
})
export class UserInfo implements OnInit {
  userStore = inject(UserStore);
  formBuilder = inject(FormBuilder);
  user = this.userStore.user

  ngOnInit() {
    this.userStore.get().then(
      () => {
        this.userFG.patchValue({
          firstName: this.user()?.first_name as string,
          lastName: this.user()?.last_name as string,
          userName: this.user()?.username as string,
          street: this.user()?.street as string,
          city: this.user()?.city as string,
          postal_code: this.user()?.postal_code as string,
        });
        this.userFG.disable();
      }
    );
  }

  userFG = this.formBuilder.group({
    firstName: this.formBuilder.control(this.user()?.first_name, [Validators.required]),
    lastName: this.formBuilder.control(this.user()?.last_name, [Validators.required]),
    userName: this.formBuilder.control(this.user()?.username, [Validators.required]),
    street: this.formBuilder.control(this.user()?.street, [Validators.required]),
    city: this.formBuilder.control(this.user()?.city, [Validators.required]),
    postal_code: this.formBuilder.control(this.user()?.postal_code, [Validators.required]),
  })
  protected readonly UserEnum = UserEnum;
  protected readonly UserForm = UserForm
  protected readonly Menu = Menu;
}
