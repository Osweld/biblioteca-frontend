import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Autor, AutorPage, AutorSave } from './autores.interface';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {

  private apiUrlBase = environment.apiUrl + '/api/v1/autor';
  private http = inject(HttpClient)
  private autoresUpdatedSubject = new Subject<void>();

  constructor() { }



  getAutorUpdatedListener(): Observable<void> {
    return this.autoresUpdatedSubject.asObservable();
  }

  getAutor(id: number): Observable<Autor> {
    return this.http.get<Autor>(`${this.apiUrlBase}/${id}`);
  }

  getAllAutor(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrlBase);
  }

  getAllAutorByPagination(page: number = 0, size: number = 20): Observable<AutorPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<AutorPage>(`${this.apiUrlBase}/pagination`, { params });
  }

  getAutorByNombre(nombre: string): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.apiUrlBase}/nombre/${nombre}`);
  }

  createAutor(autor: AutorSave): Observable<AutorSave> {
    return this.http.post<AutorSave>(this.apiUrlBase, autor).pipe(
      tap(() => this.autoresUpdatedSubject.next())
    );
  }

  updateAutor(id: number, autor: AutorSave): Observable<AutorSave> {
    return this.http.put<AutorSave>(`${this.apiUrlBase}/${id}`, autor).pipe(
      tap(() => this.autoresUpdatedSubject.next())
    );
  }

  deleteAutor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlBase}/${id}`).pipe(
      tap(() => this.autoresUpdatedSubject.next())
    );
  }

}
