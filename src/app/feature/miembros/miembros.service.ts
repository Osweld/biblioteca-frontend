import { Injectable, inject } from '@angular/core';
import { Costos, EstadoUsuario, Genero, Miembro, MiembroSave, MiembrosPage, Rol } from './miembros.interface';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {

  private apiUrlBase = environment.apiUrl + '/api/v1/persona';
  private miembroUpdatedSubject = new Subject<void>();
  private apiUrl = environment.apiUrl + '/api/v1';
 private http = inject(HttpClient)

  getMiembros(page: number, size: number): Observable<MiembrosPage> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<MiembrosPage>(this.apiUrlBase, { params });
  }

  getMiembroById(id: number): Observable<Miembro> {
    return this.http.get<Miembro>(`${this.apiUrlBase}/${id}`);
  }

  addMiembro(miembro: MiembroSave): Observable<MiembroSave> {
    return this.http.post<MiembroSave>(this.apiUrlBase, miembro).pipe(
      tap(() => {
        this.miembroUpdatedSubject.next();
      })
    );
  }

  updateMiembro(miembro: MiembroSave): Observable<MiembroSave> {
    return this.http.put<MiembroSave>(`${this.apiUrlBase}/${miembro.id}`, miembro).pipe(
      tap(() => {
        this.miembroUpdatedSubject.next();
      })
    );
  }

  updateMembresia(miembro: Miembro): Observable<Miembro> {
    return this.http.put<Miembro>(`${this.apiUrlBase}/membresia/${miembro.id}`, miembro).pipe(
      tap(() => {
        this.miembroUpdatedSubject.next();
      })
    );
  }

  getMiembroByEmail(email: string): Observable<Miembro> {
    return this.http.get<Miembro>(`${this.apiUrlBase}/email/${email}`);
  }

  getMiembroByDui(dui: string): Observable<Miembro> {
    return this.http.get<Miembro>(`${this.apiUrlBase}/dui/${dui}`);
  }

  getMiembroUpdatedListener(): Observable<void> {
    return this.miembroUpdatedSubject.asObservable();
  }

  getEstadoUsuario(): Observable<EstadoUsuario[]> {
    return this.http.get<EstadoUsuario[]>(`${this.apiUrl}/estado-usuario`);
  }

  getGenero(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrl}/genero`);
  }

  getRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/rol`);
  }

  getCostoMembresia(): Observable<Costos> {
    return this.http.get<Costos>(`${this.apiUrl}/mora/tipo-pago/1`);
  }
}
