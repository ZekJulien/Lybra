import {Component, inject} from '@angular/core';
import {AuthorFormEnum} from '../../enums';
import {Button} from 'primeng/button';
import {Fieldset} from 'primeng/fieldset';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Menu} from '../../../../core/enums';
import {AuthStore} from '../../../auths/stores/auth.store';
import {AuthorStore} from '../../stores/author.store';
import {Author} from '../../models';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-author-form',
  imports: [
    Button,
    Fieldset,
    InputGroup,
    InputGroupAddon,
    InputText,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './author-form.html',
  styleUrl: './author-form.scss'
})
export class AuthorForm {
  formBuilder = inject(FormBuilder);
  authorStore = inject(AuthorStore);
  author = this.authorStore.author;


  authorForm = this.formBuilder.group({
    name: this.formBuilder.control(this.author()?.name, [Validators.required]),
    nationality: this.formBuilder.control(this.author()?.birthdate),
    birthdate: this.formBuilder.control( this.author()?.nationality),
  })


  protected readonly AuthorFormEnum = AuthorFormEnum;
  protected readonly Menu = Menu;
}
