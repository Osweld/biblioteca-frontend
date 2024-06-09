import { MiembrosService } from './../../miembros.service';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Miembro } from '../../miembros.interface';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';
import { PdfService } from '../../../../core/pdf/pdf.service';

@Component({
  selector: 'app-ver-miembro-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-miembro-modal.component.html',
  styleUrl: './ver-miembro-modal.component.css'
})
export class VerMiembroModalComponent {
  @Input() miembro?: Miembro;

  public miembroService = inject(MiembrosService);
  public sharedService = inject(SharedService);
  public pdfService = inject(PdfService);


  actualizarMembresia(miembro: Miembro) {
    this.miembroService.updateMembresia(miembro).subscribe({
      next: (data) => {
        this.sharedService.showAlert('success', 'Membresia actualizada correctamente');
        const modalElement = document.getElementById('verMiembroModal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          modal!.hide();
        }
      }, error: (error) => {
        this.sharedService.showAlert('danger', 'Error al actualizar la membresia');
        console.error(error);
      }
    });
  }

  generateMemberPdf(): void {
    if (this.miembro) {
      this.pdfService.generateMemberPdf('memberDetails', 'carnet.pdf', this.miembro.dui);
    }
  }
}
