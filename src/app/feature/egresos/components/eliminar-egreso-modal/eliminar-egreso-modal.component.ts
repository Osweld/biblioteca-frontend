import { Component, Input, inject } from '@angular/core';
import { Egreso } from '../../egreso.interface';
import { CommonModule } from '@angular/common';
import { EgresosService } from '../../egresos.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-eliminar-egreso-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar-egreso-modal.component.html',
  styleUrl: './eliminar-egreso-modal.component.css'
})
export class EliminarEgresoModalComponent {

  @Input() egreso?: Egreso;

  public egresoService = inject(EgresosService);
  public sharedService = inject(SharedService);

  constructor() {

  }

  deleteEgreso() {
    this.egresoService.deleteEgreso(this.egreso?.id!).subscribe({
      next: () => {
        this.sharedService.showAlert('success', 'Egreso eliminado correctamente');
        const modalElement = document.getElementById('eliminarEgresoModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          modal!.hide();
        }
      },
      error: (error) => {
        console.error(error);
        this.sharedService.showAlert('danger', 'Error al eliminar el egreso');
      }
    });
  }


}
