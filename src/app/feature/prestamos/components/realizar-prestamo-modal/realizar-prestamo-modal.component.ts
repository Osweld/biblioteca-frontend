import {  PrestamoSave } from './../../prestamo.interface';
import { Component, Input, inject } from '@angular/core';
import { Material, Persona, Prestamo } from '../../prestamo.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrestamosService } from '../../prestamos.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-realizar-prestamo-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './realizar-prestamo-modal.component.html',
  styleUrl: './realizar-prestamo-modal.component.css'
})
export class RealizarPrestamoModalComponent {
  @Input() miembro?: Persona;
  @Input() materialActualPrestado?: number;

  material?: Material;
  bibliotecario?: Persona;
  prestamoSave?: PrestamoSave;

  id = new FormControl('');

  public prestamoService = inject(PrestamosService);
  public sharedService = inject(SharedService);


  searchMaterial() {
    this.material = undefined;
    this.prestamoService.getMaterialById(Number(this.id.value!)).subscribe({
      next: data => {
        this.material = data;
        const bibliotecarioData = localStorage.getItem("bibliotecario");
        if (bibliotecarioData) {
          this.bibliotecario = JSON.parse(bibliotecarioData);
        }
      },
      error: err => {
        this.sharedService.showAlert('danger', 'Material no encontrado');
      }
    })

  }

  agregarPrestamo() {
      this.prestamoSave = {
        material: this.material!,
        miembro: this.miembro!,
        bibliotecario: this.bibliotecario!
      }

      this.prestamoService.savePrestamo(this.prestamoSave).subscribe({
        next: () => {
          this.material = undefined;
          this.id.setValue('');
          this.miembro = undefined;
          this.sharedService.showAlert('success', 'Prestamo realizado con exito');

          const modalElement = document.getElementById('realizarPrestamoModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }
        },
        error: () => {
          this.sharedService.showAlert('danger', 'Error al realizar el prestamo');
        }
      });
  }

  onModalShown(){
    this.id.setValue('');
    this.material = undefined;
    this.bibliotecario = undefined;
  }

}
