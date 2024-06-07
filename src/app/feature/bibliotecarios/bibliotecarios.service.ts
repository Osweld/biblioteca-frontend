import { Injectable, inject } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Genero, PasswordDTO, Usuario, UsuarioPage, UsuarioSave } from './bibliotecario.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BibliotecariosService {

  private apiUrl = environment.apiUrl + '/api/v1/usuario';
  private apiUrlBase = environment.apiUrl + '/api/v1';
  private bibliotecarioUpdatedSubject = new Subject<void>();

  constructor() { }

  private http = inject(HttpClient);

  findAll(page: number = 0, size: number = 20): Observable<UsuarioPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<UsuarioPage>(`${this.apiUrl}`, { params });
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  findByDui(dui: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/dui/${dui}`);
  }

  save(usuario: UsuarioSave): Observable<UsuarioSave> {
    return this.http.post<UsuarioSave>(`${this.apiUrl}`, usuario).pipe(
      tap(() => {
        this.bibliotecarioUpdatedSubject.next();
      })
    );
  }

  updatePassword(id: number, passwordDTO: PasswordDTO): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/password/${id}`, passwordDTO);
  }

  update(usuario: UsuarioSave): Observable<UsuarioSave> {
    return this.http.put<UsuarioSave>(`${this.apiUrl}/${usuario.id}`, usuario).pipe(
      tap(() => {
        this.bibliotecarioUpdatedSubject.next();
      })
    );
  }
  getBibliotecarioUpdatedListener(): Observable<void> {
    return this.bibliotecarioUpdatedSubject.asObservable();
  }

  getGenero(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrlBase}/genero`);
  }
}
