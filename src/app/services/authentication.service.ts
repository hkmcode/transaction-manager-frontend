import { Loginresponse } from './../models/loginresponse';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    public url: string = API_URL + "/login";
    login(model: any): Observable<Loginresponse> {
      return this.http.post<Loginresponse>(this.url, model);
  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('current_user');
    }
}
