import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { Egreso, EgresoPage, TipoEgreso } from './egreso.interface';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/v1/egreso';
  private apiUrlBase = environment.apiUrl + '/api/v1';

  private egresoUpdatedSubject = new Subject<void>();

  constructor() { }


  getEgresos(page: number = 0, size: number = 20): Observable<EgresoPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<EgresoPage>(this.apiUrl, { params });
  }


  createEgreso(egreso: Egreso): Observable<Egreso> {
    return this.http.post<Egreso>(this.apiUrl, egreso).pipe(
      tap(() => this.egresoUpdatedSubject.next())

    );
  }

  deleteEgreso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.egresoUpdatedSubject.next())

    );
  }

  getTipoEgresos(): Observable<TipoEgreso[]>{
    return this.http.get<TipoEgreso[]>(`${this.apiUrlBase}/tipo-egreso`);
  }

  getEgresoUpdatedListener(): Observable<void> {
    return this.egresoUpdatedSubject.asObservable();
  }
}
