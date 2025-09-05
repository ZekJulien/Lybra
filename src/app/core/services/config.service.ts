import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly apiURL = environment.apiURL;

  get_api_url() : string {
    return this.apiURL;
  }
}
