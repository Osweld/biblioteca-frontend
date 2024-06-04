import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Autor, Categoria, EstadoMaterial, Idioma, Material, MaterialPage, MaterialState } from './materiales.interface';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/api/v1/material';
  private apiUrlBase = environment.apiUrl + '/api/v1';

  constructor() { }

  getMateriales(page: number, size: number, idIdioma?: number, idAutor?: number, idCategoria?: number, idEstadoMaterial?: number): Observable<MaterialPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

      if (idIdioma !== undefined && idIdioma !== 0) {
        params = params.set('idIdioma', idIdioma.toString());
      }
      if (idAutor !== undefined && idAutor !== 0) {
        params = params.set('idAutor', idAutor.toString());
      }
      if (idCategoria !== undefined && idCategoria !== 0) {
        params = params.set('idCategoria', idCategoria.toString());
      }
      if (idEstadoMaterial !== undefined && idEstadoMaterial !== 0) {
        params = params.set('idEstadoMaterial', idEstadoMaterial.toString());
      }


    return this.http.get<MaterialPage>(this.apiUrl, { params })
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  getEstadoMaterial(): Observable<EstadoMaterial[]> {
    return this.http.get<EstadoMaterial[]>(this.apiUrlBase + '/estado-material')
  }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.apiUrlBase}/autor`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrlBase}/categoria`);
  }

  getIdiomas(): Observable<Idioma[]> {
    return this.http.get<Idioma[]>(`${this.apiUrlBase}/idioma`);
  }

}
