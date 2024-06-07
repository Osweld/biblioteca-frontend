import { Component, Input, inject } from '@angular/core';
import { Prestamo } from '../../prestamo.interface';
import { CommonModule } from '@angular/common';
import { PrestamosService } from '../../prestamos.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-ver-prestamo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-prestamo-modal.component.html',
  styleUrl: './ver-prestamo-modal.component.css'
})
export class VerPrestamoModalComponent {

  public prestamoService = inject(PrestamosService);
  public sharedService = inject(SharedService);

  montoMora: number = 0;
  montoPerdida: number = 0;



  @Input() prestamo?: Prestamo;


  renovarPrestamo() {
    this.prestamoService.renovarPrestamo(this.prestamo!.id).subscribe({
      next: () => {
        this.sharedService.showAlert('success', 'Prestamo renovado con exito');
        const modalElement = document.getElementById('verPrestamoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          modal!.hide();
        }
      },
      error: () => {
        this.sharedService.showAlert('danger', 'Error al renovar el prestamo');
      }
    });
  }

  devolverPrestamo() {
    this.prestamoService.devolucion(this.prestamo!).subscribe({
      next: () => {
        this.sharedService.showAlert('success', 'Prestamo devuelto con exito');

        const modalElement = document.getElementById('verPrestamoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          modal!.hide();
        }
      },
      error: () => {
        this.sharedService.showAlert('danger', 'Error al devolver el prestamo');
      }
    });
  }


  devolverPrestamoSinMaterial() {
    this.prestamoService.devolucionSinMaterial(this.prestamo!).subscribe({
      next: () => {
        this.sharedService.showAlert('success', 'Prestamo sin material educativo devuelto con exito');

        const modalElement = document.getElementById('verPrestamoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          modal!.hide();
        }
      },
      error: () => {
        this.sharedService.showAlert('danger', 'Error al devolver el prestamo sin material educativo');
      }
    });
  }

  onModalShown(){
    this.montoMora = 0;
    this.montoPerdida = 0;
    this.prestamoService.getMontoMoraByPrestamoId(this.prestamo!.id).subscribe({
      next: data => {
        this.montoMora = data;
      }
    });

    this.prestamoService.getMontoPerdidaByPrestamoId(this.prestamo!.id).subscribe({
      next: data => {
        this.montoPerdida = data;
      }
    });
  }
}
