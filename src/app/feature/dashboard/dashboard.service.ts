import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estadisticas, PrestamosDay } from './dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl + '/api/v1/dashboard';
  private http = inject(HttpClient)

  constructor() { }


  getEstadisticas():Observable<Estadisticas> {
    return this.http.get<Estadisticas>(this.apiUrl + '/basic');
  }

  getPrestamosDay():Observable<PrestamosDay[]> {
    return this.http.get<PrestamosDay[]>(this.apiUrl + '/prestamos-ultima-semana');
  }
}
