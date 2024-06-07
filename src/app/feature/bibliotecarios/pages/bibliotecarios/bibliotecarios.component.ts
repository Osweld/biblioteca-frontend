import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BibliotecariosService } from './../../bibliotecarios.service';
import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../../../shared/shared.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../../shared/shared.interface';
import { Subscription } from 'rxjs';
import { Usuario, UsuarioPage } from '../../bibliotecario.interface';
import { VerBibliotecarioModalComponent } from '../../components/ver-bibliotecario-modal/ver-bibliotecario-modal.component';
import { Modal } from 'bootstrap';
import { AgregarEditarBibliotecarioModalComponent } from '../../components/agregar-editar-bibliotecario-modal/agregar-editar-bibliotecario-modal.component';

@Component({
  selector: 'app-bibliotecarios',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule, PaginationComponent,VerBibliotecarioModalComponent,AgregarEditarBibliotecarioModalComponent],
  templateUrl: './bibliotecarios.component.html',
  styleUrl: './bibliotecarios.component.css'
})
export default class BibliotecariosComponent {

  @ViewChild('agregarEditarUsuarioModal') agregarEditarUsuarioModal: any;
  @ViewChild('verUsuarioModal') verUsuarioModal: any;
  selectedUsuario?: Usuario;

  usuarioPage!:UsuarioPage;

  public bibliotecariosService = inject(BibliotecariosService);
  public sharedService = inject(SharedService);


  private BibliotecarioUpdatedSub!: Subscription;

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  page: number = 0;
  size: number = 20;

  dui = new FormControl('');
  duiEditar = new FormControl('');

  constructor(){
    this.bibliotecariosService.findAll(this.page, this.size).subscribe({
      next: (data: UsuarioPage) => {
        this.usuarioPage = data;
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

    this.BibliotecarioUpdatedSub = this.bibliotecariosService.getBibliotecarioUpdatedListener().subscribe({
      next: () => {
        this.bibliotecariosService.findAll(this.page, this.size).subscribe({
          next: (data: UsuarioPage) => {
            this.usuarioPage = data;
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







  nextPage(page: number) {

    this.page = page;
    this.bibliotecariosService.findAll(this.page, this.size).subscribe({
      next: (data: UsuarioPage) => {
        this.usuarioPage = data;
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

  buscarByDUI(){
    this.bibliotecariosService.findByDui(this.duiEditar.value!).subscribe({
      next: (usuario: Usuario) => {
        this.selectedUsuario = usuario;
        const modalElement = document.getElementById('agregarEditarUsuarioModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
        this.dui.setValue('');
      },
      error: (error) => {
        this.sharedService.showAlert('danger', 'No se encontró el bibliotecario con el DUI proporcionado')
        console.error(error);
      }
    });
  }

  openModalVer(usuario:Usuario){

    this.selectedUsuario = usuario;
    const modalElement = document.getElementById('verUsuarioModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  openModalEditar(usuario:Usuario){
    this.selectedUsuario = usuario;
    const modalElement = document.getElementById('agregarEditarUsuarioModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  searchBibliotecario(){
    this.bibliotecariosService.findByDui(this.dui.value!).subscribe({
      next: (usuario: Usuario) => {
        this.selectedUsuario = usuario;
        const modalElement = document.getElementById('verUsuarioModal');
        if (modalElement) {
          const modal = new Modal(modalElement);
          modal.show();
        }
        this.dui.setValue('');
      },
      error: (error) => {
        this.sharedService.showAlert('danger', 'No se encontró el bibliotecario con el DUI proporcionado')
        console.error(error);
      }
    });
  }

  openModalAgregar(){
    this.selectedUsuario = undefined;
    const modalElement = document.getElementById('agregarEditarUsuarioModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }

  }

}
