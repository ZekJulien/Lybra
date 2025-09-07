import { Component } from '@angular/core';
import {AuthInfo} from '../../components/auth-info/auth-info';
@Component({
  selector: 'app-profile',
  imports: [
    AuthInfo,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

}
