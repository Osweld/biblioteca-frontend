import { Component, Input, inject } from '@angular/core';
import { Autor, AutorSave } from '../../autores.interface';
import { AutoresService } from '../../autores.service';
import { SharedService } from '../../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-agregar-editar-autor-modal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './agregar-editar-autor-modal.component.html',
  styleUrl: './agregar-editar-autor-modal.component.css'
})
export class AgregarEditarAutorModalComponent {

  @Input() autor?: Autor;
  autorSaved?: AutorSave;

  autorForm: FormGroup;

  public autorService = inject(AutoresService);
  public sharedService = inject(SharedService);
  public fb = inject(FormBuilder);


  autorFormValidationMessages = {
    autor: [
      { type: 'required', message: 'El nombre del autor es requerido' },
      { type: 'minlength', message: 'El nombre del autor debe tener al menos 1 carácter' },
      { type: 'maxlength', message: 'El nombre del autor no debe exceder los 100 caracteres' }
    ]
  };

  constructor(){
    this.autorForm = this.fb.group({
      autor: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
    });
  }

  onModalShown(){
    this.autorForm.reset();
    if(this.autor){
      this.autorForm.patchValue({
        autor: this.autor.autor
      });
    }

  }

  onSubmit(){
    if(this.autorForm.valid){
      if(this.autor){
        this.autorSaved ={
          id: this.autor.id,
          autor: this.autorForm.value.autor
        }
        this.autorService.updateAutor(this.autor.id, this.autorSaved).subscribe({
          next: (data) => {
            this.autorForm.reset();
            this.sharedService.showAlert('success','Autor actualizado correctamente')
            const modalElement = document.getElementById('agregarAutorModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              modal!.hide();
            }

            this.autorSaved = undefined;
            this.autor = undefined;
          },
          error: (error) => {
           this.sharedService.showAlert('danger','Error al actualizar el autor')
          }
        });
      }else{
        this.autorSaved ={
          autor: this.autorForm.value.autor
        }

        this.autorService.createAutor(this.autorSaved).subscribe({
          next: (data) => {
            this.autorForm.reset();
            this.sharedService.showAlert('success','Autor creado correctamente')
            const modalElement = document.getElementById('agregarAutorModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              modal!.hide();
            }
            this.autorSaved = undefined;
            this.autor = undefined;

          },
          error: (error) => {
           this.sharedService.showAlert('danger','Error al crear el autor')
          }
        });

      }
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.autorForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

}
