import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { EgresosService } from '../../egresos.service';
import { Pagination } from '../../../../shared/shared.interface';
import { Subscription } from 'rxjs';
import { Egreso, EgresoPage } from '../../egreso.interface';
import { AgregarEgresoModalComponent } from '../../components/agregar-egreso-modal/agregar-egreso-modal.component';
import { EliminarEgresoModalComponent } from '../../components/eliminar-egreso-modal/eliminar-egreso-modal.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-egresos',
  standalone: true,
  imports: [CommonModule,PaginationComponent,AgregarEgresoModalComponent,EliminarEgresoModalComponent],
  templateUrl: './egresos.component.html',
  styleUrl: './egresos.component.css'
})
export class EgresosComponent {

  @ViewChild('agregarEgresoModal') agregarEgresoModal: any;
  @ViewChild('eliminarEgresoModal') eliminarEgresoModal: any;
  egresoSelected?: Egreso;



  egresoPage!:EgresoPage;

  public egresoService = inject(EgresosService);


  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }


  private EgresoUpdatedSub!: Subscription;

  page: number = 0;
  size: number = 20;


  constructor() {
    this.egresoService.getEgresos(this.page, this.size).subscribe({
      next: (data: EgresoPage) => {
        this.egresoPage = data;
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

    this.EgresoUpdatedSub = this.egresoService.getEgresoUpdatedListener().subscribe({
      next: () => {
        this.egresoService.getEgresos(this.page, this.size).subscribe({
          next: (data: EgresoPage) => {
            this.egresoPage = data;
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
    });
   }



   nextPage(page: number){
    this.page = page;
    this.egresoService.getEgresos(this.page, this.size).subscribe({
      next: (data: EgresoPage) => {
        this.egresoPage = data;
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

   deleteEgreso(egreso:Egreso){
    this.egresoSelected = egreso;
    const modalElement = document.getElementById('eliminarEgresoModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }

   }

   openModalAgregar(){
    const modalElement = document.getElementById('agregarEgresoModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
   }

}
