import { AutorPage } from './../../autores.interface';
import { Autor } from './../../../prestamos/prestamo.interface';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { Pagination } from '../../../../shared/shared.interface';
import { AgregarEditarAutorModalComponent } from '../../components/agregar-editar-autor-modal/agregar-editar-autor-modal.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { EliminarAutorModalComponent } from '../../components/eliminar-autor-modal/eliminar-autor-modal.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoresService } from '../../autores.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, PaginationComponent, EliminarAutorModalComponent, AgregarEditarAutorModalComponent],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent {

  @ViewChild('agregarEditarAutorModal') agregarEditarAutorModal!: any;
  @ViewChild('eliminarAutorModal') eliminarAutorModal!: any;
  autorSelected?: Autor;

  public autorService = inject(AutoresService);
  public sharedService = inject(SharedService);

  autorPage!: AutorPage;
  autorUpdatedSub!: Subscription;

  page: number = 0;
  size: number = 20;

  id = new FormControl('');



  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  constructor(){
    this.autorService.getAllAutorByPagination(this.page, this.size).subscribe({
      next: (data: AutorPage) => {
        this.autorPage = data;
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

    this.autorUpdatedSub = this.autorService.getAutorUpdatedListener()
    .subscribe(()=>{
      this.page= 0;
      this.autorService.getAllAutorByPagination(this.page, this.size).subscribe({
        next: (data: AutorPage) => {
          this.autorPage = data;
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


  nextPage(page:number){
    this.page = page;
    this.autorService.getAllAutorByPagination(this.page, this.size).subscribe({
      next: (data: AutorPage) => {
        this.autorPage = data;
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

  searchAutor(){
    this.autorSelected = undefined;
    this.autorService.getAutor(Number(this.id.value)).subscribe({
      next: data => {
        this.autorSelected = data;
                const modalElement = document.getElementById('agregarAutorModal');
                if (modalElement) {
                  const modal = new Modal(modalElement);
                  modal.show();
                }
      this.id.reset();
      },
      error: (error) => {
        this.sharedService.showAlert('danger', 'No se encontró el autor con el id proporcionado')
      }
    });
  }


  openModalEditar(autor:Autor){
    this.autorSelected = autor;
                const modalElement = document.getElementById('agregarAutorModal');
                if (modalElement) {
                  const modal = new Modal(modalElement);
                  modal.show();
                }
  }

  openModalAgregar(){
    this.autorSelected = undefined;
    const modalElement = document.getElementById('agregarAutorModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openModalEliminar(autor:Autor){
    this.autorSelected = autor;
    const modalElement = document.getElementById('eliminarAutorModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
