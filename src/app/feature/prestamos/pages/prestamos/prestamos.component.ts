
import { SharedService } from './../../../../shared/shared.service';
import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Persona, Prestamo, PrestamoPage } from '../../prestamo.interface';
import { PrestamosService } from '../../prestamos.service';
import { Pagination } from '../../../../shared/shared.interface';
import { VerPrestamoModalComponent } from '../../components/ver-prestamo-modal/ver-prestamo-modal.component';
import { Modal } from 'bootstrap';
import { RealizarPrestamoModalComponent } from '../../components/realizar-prestamo-modal/realizar-prestamo-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, PaginationComponent,VerPrestamoModalComponent,RealizarPrestamoModalComponent],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export default class PrestamosComponent {

  @ViewChild("verPrestamoModal") verPrestamoModal: any;
  @ViewChild("realizarPrestamoModal") realizarPrestamoModal: any;
  prestamoSelects!: Prestamo;
  miembroSelects!: Persona;
  numeroMaterial: number = 0;

  private prestamoUpdatedSub!: Subscription;

  miembro!: Persona;
  miembroLocalStorages!: Persona;
  prestamosActuales!: Prestamo[];
  prestamosHistorial!: PrestamoPage;

  page: number = 0;
  size: number = 20;

  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }

  public prestamoService = inject(PrestamosService);
  public sharedService = inject(SharedService);

  dui = new FormControl('');

  constructor() {
    this.prestamoUpdatedSub = this.prestamoService.getPrestamoUpdatedListener().subscribe({
      next: () => {
        this.miembroLocalStorages = JSON.parse(localStorage.getItem("miembro")!);
        this.prestamoService.getPersonaByDui(this.miembroLocalStorages.dui).subscribe({
          next: data => {
            this.miembro = data;
            localStorage.setItem("miembro",JSON.stringify(this.miembro));
            localStorage.setItem("miembro",JSON.stringify(this.miembro));
            this.prestamoService.getActivePrestamosByPersonaId(this.miembro.id).subscribe(data => {
              this.prestamosActuales = data;
              this.numeroMaterial = this.prestamosActuales.length | 0;
              this
            });
            this.prestamoService.getHistorialPrestamosByPersonaId(this.miembro.id,this.page,this.size).subscribe(data => {
              this.prestamosHistorial = data;
              this.pagina = {
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                page: data.number
              }
            });
          },
          error: error => {
            this.sharedService.showAlert('danger', 'No se encontró el miembro con el DUI ingresado.')
          }
        });
      }
    });
  }


  searchMiembro() {
    this.prestamoService.getPersonaByDui(this.dui.value!).subscribe({
      next: data => {
        this.miembro = data;
        localStorage.setItem("miembro",JSON.stringify(this.miembro));
        this.prestamoService.getActivePrestamosByPersonaId(this.miembro.id).subscribe(data => {
          this.prestamosActuales = data;
          this.numeroMaterial = this.prestamosActuales.length | 0;
          this
        });
        this.prestamoService.getHistorialPrestamosByPersonaId(this.miembro.id,this.page,this.size).subscribe(data => {
          this.prestamosHistorial = data;
          this.pagina = {
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            page: data.number
          }
        });
      },
      error: error => {
        this.sharedService.showAlert('danger', 'No se encontró el miembro con el DUI ingresado.')
      }
    });
  }


  openModalVer(prestamo: Prestamo) {
    this.prestamoSelects = prestamo;
    const modalElement = document.getElementById('verPrestamoModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }

  }

  nextPage(page: number) {
    this.prestamoService.getHistorialPrestamosByPersonaId(this.miembro.id,page, this.size).subscribe({
      next: data => {
        this.prestamosHistorial = data;
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
  openModalRealizarPrestamo(){
    this.miembroSelects = this.miembro;
    this.numeroMaterial = this.prestamosActuales.length | 0;
    const modalElement = document.getElementById('realizarPrestamoModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }


}
