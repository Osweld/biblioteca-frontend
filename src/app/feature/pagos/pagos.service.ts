import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environment';
import { PagoPage } from './pagos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/v1/pago';

  constructor() { }

  getPagos(page: number, size: number): Observable<PagoPage> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PagoPage>(this.apiUrl, { params });
  }
}
