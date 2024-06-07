import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Login } from './login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private apiUrlBase = environment.apiUrl + '/api/v1/auth';
  private http = inject(HttpClient)


  login(login:Login) {
    return this.http.post(`${this.apiUrlBase}/login`, login);
  }
}
