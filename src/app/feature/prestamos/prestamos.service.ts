import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { Observable, Subject, tap } from 'rxjs';
import { Material, Persona, Prestamo, PrestamoPage, PrestamoSave } from './prestamo.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {


  private apiUrl = environment.apiUrl + '/api/v1/prestamo';
  private prestamoUpdatedSubject = new Subject<void>();
  private apiUrlBase = environment.apiUrl + '/api/v1';
  private http = inject(HttpClient)

  constructor() { }

  getPrestamoUpdatedListener(): Observable<void> {
    return this.prestamoUpdatedSubject.asObservable();
  }

  findAll(page: number = 0, size: number = 20): Observable<PrestamoPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PrestamoPage>(`${this.apiUrl}`, { params });
  }

  getPrestamo(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiUrl}/${id}`);
  }

  getActivePrestamosByPersonaId(idPersona: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/activos/${idPersona}`);
  }

  getHistorialPrestamosByPersonaId(idPersona: number, page: number = 0, size: number = 20): Observable<PrestamoPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PrestamoPage>(`${this.apiUrl}/historial/${idPersona}`, { params });
  }

  savePrestamo(prestamo: PrestamoSave): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}`, prestamo).pipe(
      tap(() => this.prestamoUpdatedSubject.next())
    );;
  }

  devolucion(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}/devolucion`, prestamo).pipe(
      tap(() => this.prestamoUpdatedSubject.next())
    );;
  }

  devolucionSinMaterial(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}/devolucion-sin-material`, prestamo).pipe(
      tap(() => this.prestamoUpdatedSubject.next())
    );;
  }

  renovarPrestamo(id: number): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.apiUrl}/renovar/${id}`, {}).pipe(
      tap(() => this.prestamoUpdatedSubject.next())
    );
  }

  getPersonaByDui(dui: string): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrlBase}/persona/dui/${dui}`);
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrlBase}/material/${id}`);
  }


  getMontoMoraByPrestamoId(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/mora/${id}`);
  }

  getMontoPerdidaByPrestamoId(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/perdida/${id}`);
  }

}
