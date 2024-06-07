import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MiembrosService } from '../../miembros.service';
import { Costos, Miembro, MiembrosPage } from '../../miembros.interface';
import { CommonModule } from '@angular/common';
import { VerMiembroModalComponent } from '../../components/ver-miembro-modal/ver-miembro-modal.component';
import { Modal } from 'bootstrap';
import { AgregarEditarMiembroModalComponent } from '../../components/agregar-editar-miembro-modal/agregar-editar-miembro-modal.component';
import { Subscription } from 'rxjs';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/shared.interface';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, VerMiembroModalComponent,AgregarEditarMiembroModalComponent,PaginationComponent],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.css'
})
export default class MiembrosComponent {

  @ViewChild('verMiembroModal') verMiembroModal: any;
  selectedMiembro?: Miembro;
  costo!:Costos;

  @ViewChild('agregarEditarMiembroModal') agregarEditarMiembroModal: any;

  miembrosPage!: MiembrosPage;

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  private miembrosSub!: Subscription;
  private miembroUpdatedSub!: Subscription;

  public miembroService = inject(MiembrosService);
  public sharedService = inject(SharedService);

  page: number = 0;
  size: number = 20;

  dui = new FormControl('');
  duiEditar = new FormControl('');


  constructor() {
    this.miembroService.getMiembros(this.page, this.size).subscribe({
      next: (data: MiembrosPage) => {
        this.miembrosPage = data;
        this.pagina = {
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.number
        }
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.miembroService.getCostoMembresia().subscribe({
      next: (data: Costos) => {
        this.costo = data;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.miembroUpdatedSub = this.miembroService.getMiembroUpdatedListener()
    .subscribe(() => {
      this.page = 0;
      this.miembroService.getMiembros(this.page, this.size).subscribe({
        next: (data: MiembrosPage) => {
          this.miembrosPage = data;
          this.pagina = {
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            page: data.number
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  searchMiembro() {
    console.log(this.dui.value!)
    this.miembroService.getMiembroByDui(this.dui.value!).subscribe({

      next: (miembro: Miembro) => {
        this.selectedMiembro = miembro;
        const modalElement = document.getElementById('verMiembroModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
        this.dui.setValue('');
      },
      error: (error) => {
        this.sharedService.showAlert('danger', 'No se encontró el miembro con el DUI proporcionado')
        console.error(error);
      }
    });
  }

  editarByDUI(){
    this.miembroService.getMiembroByDui(this.duiEditar.value!).subscribe({
      next: (miembro: Miembro) => {
        this.selectedMiembro = miembro;
        const modalElement = document.getElementById('agregarEditarMiembroModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
        this.duiEditar.setValue('');
      },
      error: (error) => {
        this.sharedService.showAlert('danger', 'No se encontró el miembro con el DUI proporcionado')
        console.error(error);
      }
    });

  }

  nextPage(page: number) {
    this.miembroService.getMiembros(page, this.size).subscribe({
      next: (data: MiembrosPage) => {
        this.miembrosPage = data;
        this.pagina = {
          totalElements: data.totalElements,
          totalPages: data.totalPages,
          page: data.number
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
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
