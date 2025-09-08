import { Component } from '@angular/core';
import {AuthInfo} from '../../components/auth-info/auth-info';
import {UserInfo} from '../../../users/components/user-info/user-info';
@Component({
  selector: 'app-profile',
  imports: [
    AuthInfo,
    UserInfo,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {

}
