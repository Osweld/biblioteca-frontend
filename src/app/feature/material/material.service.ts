import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { Autor, Categoria, EstadoMaterial, Idioma, Material, MaterialPage, MaterialSave } from './materiales.interface';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private http = inject(HttpClient)

  private apiUrl = environment.apiUrl + '/api/v1/material';
  private apiUrlBase = environment.apiUrl + '/api/v1';
  private materialUpdatedSubject = new Subject<void>();

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

  saveMaterial(material: MaterialSave): Observable<MaterialSave> {
    return this.http.post<MaterialSave>(this.apiUrl, material).pipe(
      tap(() => {
        this.materialUpdatedSubject.next();
      })
    );
  }

  updateMaterial(material: MaterialSave): Observable<MaterialSave> {
    return this.http.put<MaterialSave>(`${this.apiUrl}/${material.id}`, material).pipe(
      tap(() => {
        this.materialUpdatedSubject.next();
      })
    );
  }

  getMaterialUpdatedListener(): Observable<void> {
    return this.materialUpdatedSubject.asObservable();
  }


  //Others...

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
