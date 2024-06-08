import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Estadisticas, PrestamosDay } from '../../dashboard.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

  estadisticas?:Estadisticas;
  prestamosPorDia?:PrestamosDay[];//Son prestamos por dia de la ultima semana

  public dashboardService = inject(DashboardService);

  constructor() {
    this.dashboardService.getEstadisticas().subscribe(estadisticas => {
      this.estadisticas = estadisticas;
    });

    this.dashboardService.getPrestamosDay().subscribe(prestamosPorDia => {
      this.prestamosPorDia = prestamosPorDia;
    });

  }

}
