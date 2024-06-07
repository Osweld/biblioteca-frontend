import { TipoEgreso } from './../../egreso.interface';
import { Component, inject } from '@angular/core';
import { Egreso } from '../../egreso.interface';
import { EgresosService } from '../../egresos.service';
import { SharedService } from '../../../../shared/shared.service';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-agregar-egreso-modal',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './agregar-egreso-modal.component.html',
  styleUrl: './agregar-egreso-modal.component.css'
})
export class AgregarEgresoModalComponent {

  public egresoService = inject(EgresosService);
  public sharedService = inject(SharedService);
  public fb = inject(FormBuilder);

  EgresoForm!: FormGroup


  Egreso?:Egreso;
  TipoEgreso: TipoEgreso[] = [];

  constructor() {

    this.EgresoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(1),Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      tipoEgreso: ['', Validators.required]
    });

    this.egresoService.getTipoEgresos().subscribe({
      next: (data: TipoEgreso[]) => {
        this.TipoEgreso = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
   }

   EgresoFormValidationMessage = {
    monto: [
      { type: 'required', message: 'El monto es requerido' },
      { type: 'min', message: 'El monto debe ser mayor que 0' },
      { type: 'pattern', message: 'El monto debe ser un número válido' }
    ],tipoEgreso: [
      { type: 'required', message: 'El tipo de egreso es requerido' }
    ]

  };

  isFieldInvalid(field: string): boolean {
    const control = this.EgresoForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.EgresoForm.valid) {
      this.Egreso = {
        monto: this.EgresoForm.get('monto')?.value,
        tipoEgreso: {
          id: this.EgresoForm.get('tipoEgreso')?.value,
          tipo: ''
        }
      }

      this.egresoService.createEgreso(this.Egreso).subscribe({
        next: (data) => {
          this.EgresoForm.reset();
          this.sharedService.showAlert('success', 'Egreso creado correctamente');
           const modalElement = document.getElementById('agregarEgresoModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }

        },
        error: (error) => {
          this.sharedService.showAlert('danger', 'Error al crear el egreso');
        }
      });

    }
  }

  onModalShown(){
    this.EgresoForm.reset();
  }



}
