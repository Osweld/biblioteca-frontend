import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { PasswordDTO, Usuario } from './configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/v1/usuario';

  constructor() { }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  updatePassword(id: number, passwordDTO: PasswordDTO): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/password/${id}`, passwordDTO);
  }

}
