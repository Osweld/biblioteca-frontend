import { Component, inject } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { Estadisticas, Historial, PrestamosDay } from '../../dashboard.interface';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent {

  fechaActual = new Date()

  estadisticas?:Estadisticas;
  prestamosPorDia?:PrestamosDay[];//Son prestamos por dia de la ultima semana
  ingresosHistorial?:Historial;
  egresosHistorial?:Historial;

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

    this.dashboardService.getPagos().subscribe(ingresosHistorial => {
      this.ingresosHistorial = ingresosHistorial;
    });

    this.dashboardService.getEgresos().subscribe(egresosHistorial => {
      this.egresosHistorial = egresosHistorial;
    });

    Chart.register(...registerables);
  }


  renderPrestamosChart(): void {
    if (this.prestamosPorDia) {
      // Ordenar prestamosPorDia por fecha
      this.prestamosPorDia.sort((a, b) => new Date(a.dia).getTime() - new Date(b.dia).getTime());

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

  downloadPDF(){
    const fechaActual = new Date().toLocaleDateString();
    const DATA: any = document.getElementById('dashboard-content');
    html2canvas(DATA).then(canvas => {
      const fileWidth = 208;
      const fileHeight = canvas.height * fileWidth / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('dashboard_'+fechaActual+'.pdf');
    });
  }

}
