import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Estadisticas, PrestamosDay } from '../../dashboard.interface';
import { Chart, registerables } from 'chart.js';

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


  }

  ngOnInit(): void {
    this.dashboardService.getEstadisticas().subscribe(estadisticas => {
      this.estadisticas = estadisticas;
    });

    this.dashboardService.getPrestamosDay().subscribe(prestamosPorDia => {
      this.prestamosPorDia = prestamosPorDia;
      this.renderPrestamosChart();
    });

    Chart.register(...registerables);
  }


  renderPrestamosChart(): void {
    if (this.prestamosPorDia) {
      const ctx = (document.getElementById('prestamosChart') as HTMLCanvasElement).getContext('2d');
      new Chart(ctx!, {
        type: 'bar',
        data: {
          labels: this.prestamosPorDia.map(d => new Date(d.dia).toLocaleDateString()),
          datasets: [{
            label: 'Préstamos por Día',
            data: this.prestamosPorDia.map(d => d.numeroPrestamos),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}
