import { Component } from '@angular/core';
import {AuthorForm} from '../../components/author-form/author-form';

@Component({
  selector: 'app-book',
  imports: [
    AuthorForm
  ],
  templateUrl: './book.html',
  styleUrl: './book.scss'
})
export class Book {

}
