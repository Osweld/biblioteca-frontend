import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiembrosService } from '../../miembros.service';
import { Miembro, MiembrosPage } from '../../miembros.interface';
import { CommonModule } from '@angular/common';
import { VerMiembroModalComponent } from '../../components/ver-miembro-modal/ver-miembro-modal.component';
import { Modal } from 'bootstrap';
import { AgregarEditarMiembroModalComponent } from '../../components/agregar-editar-miembro-modal/agregar-editar-miembro-modal.component';

@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, VerMiembroModalComponent,AgregarEditarMiembroModalComponent],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.css'
})
export default class MiembrosComponent {

  @ViewChild('verMiembroModal') verMiembroModal: any;
  selectedMiembro?: Miembro;

  @ViewChild('agregarEditarMiembroModal') agregarEditarMiembroModal: any;

  miembrosPage!: MiembrosPage;

  public miembroService = inject(MiembrosService);

  page: number = 0;
  size: number = 2;

  id = new FormControl('');


  constructor() {
    this.miembroService.getMiembros(this.page, this.size).subscribe({
      next: (data: MiembrosPage) => {
        this.miembrosPage = data;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  searchMiembro() {

  }

  openModalVer(miembro: Miembro) {
    this.selectedMiembro = miembro;
    const modalElement = document.getElementById('verMiembroModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openModalEditar(miembro: Miembro) {
    this.selectedMiembro = miembro;
    const modalElement = document.getElementById('agregarEditarMiembroModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openModalAgregar() {
    this.selectedMiembro = undefined;
    const modalElement = document.getElementById('agregarEditarMiembroModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
