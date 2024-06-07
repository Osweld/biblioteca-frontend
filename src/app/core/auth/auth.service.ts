import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse, Usuario } from './login.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private apiUrlBase = environment.apiUrl + '/api/v1/auth';
  private apiUrl = environment.apiUrl + '/api/v1/usuario';
  private http = inject(HttpClient)


  login(login:Login) {
    return this.http.post<LoginResponse>(`${this.apiUrlBase}/login`, login);
  }

  findUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
}
