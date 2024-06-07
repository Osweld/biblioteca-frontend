
import { Component, Input, inject, OnInit } from '@angular/core';
import { Material, MaterialSave, SelectsMaterial } from '../../materiales.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialService } from '../../material.service';
import { CommonModule } from '@angular/common';
import { greaterThanZeroValidator } from '../../../../shared/validators/shared.validators';
import { Modal } from 'bootstrap';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-agregar-editar-material-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-material-modal.component.html',
  styleUrl: './agregar-editar-material-modal.component.css'
})
export class AgregarEditarMaterialModalComponent {

  @Input() material?: Material;
  @Input() select?: SelectsMaterial;
  materialSave!: MaterialSave;

  public materialService = inject(MaterialService);
  public sharedService = inject(SharedService);


  materialForm = new FormGroup({
    isbn: new FormControl('', [Validators.minLength(13), Validators.maxLength(13)]),
    titulo: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), greaterThanZeroValidator()]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]),
    idioma: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    estadoMaterial: new FormControl('', [Validators.required]),

  });


  onModalShown(): void {
    this.materialForm.reset();
    if (this.material) {
      this.materialForm.reset({
        isbn: this.material.isbn,
        titulo: this.material.titulo,
        cantidad: this.material.cantidad.toString(),
        descripcion: this.material.descripcion,
        idioma: this.material.idioma.id.toString(),
        autor: this.material.autor.id.toString(),
        categoria: this.material.categoria.id.toString(),
        estadoMaterial: this.material.estadoMaterial.id.toString()

      })
    }
  }



  isFieldInvalid(field: string): boolean {
    const control = this.materialForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  materialFormValidationMessage = {
    'isbn': [
      { type: 'minlength', message: 'El ISBN no puede ser inferior a los 13 caracteres.' },
      { type: 'maxlength', message: 'El ISBN no puede sobrepasar los 13 caracteres.' }
    ],
    'titulo': [
      { type: 'required', message: 'El título no puede quedar vacío.' }
    ],
    'cantidad': [
      { type: 'required', message: 'La cantidad no puede quedar vacía.' },
      { type: 'pattern', message: 'La cantidad debe ser un número.' },
      { type: 'greaterThanZero', message: 'La cantidad debe ser mayor a 0.' }
    ],
    'descripcion': [
      { type: 'required', message: 'La descripción no puede quedar vacía.' },
      { type: 'minlength', message: 'La descripción debe tener al menos 20 caracteres.' },
      { type: 'maxlength', message: 'La descripción no puede sobrepasar los 500 caracteres.' }
    ],
    'idioma': [
      { type: 'required', message: 'El idioma no puede quedar vacío.' }
    ],
    'autor': [
      { type: 'required', message: 'El autor no puede quedar vacío.' }
    ],
    'categoria': [
      { type: 'required', message: 'La categoría no puede quedar vacía.' }
    ],
    'estadoMaterial': [
      { type: 'required', message: 'El estado del material no puede quedar vacío.' }
    ]
  };

  onSubmit(): void {
    if (this.materialForm.valid) {

      if (this.material) {
        console.log("Actualizando material")
        this.materialSave = {
          id: this.material.id,
          isbn: this.materialForm.get('isbn')?.value!,
          titulo: this.materialForm.get('titulo')?.value!,
          cantidad: Number(this.materialForm.get('cantidad')?.value),
          descripcion: this.materialForm.get('descripcion')?.value!,
          idioma: {
            id: Number(this.materialForm.get('idioma')?.value),
            nombre: ''
          },
          autor: {
            id: Number(this.materialForm.get('autor')?.value),
            autor: ''
          },
          categoria: {
            id: Number(this.materialForm.get('categoria')?.value),
            nombre: ''
          },
          estadoMaterial: {
            id: Number(this.materialForm.get('estadoMaterial')?.value),
            estado: ''
          }

        }
        this.materialService.updateMaterial(this.materialSave).subscribe(
          {
            next: data => {
              this.materialForm.reset();
              this.sharedService.showAlert('success', 'Material actualizado correctamente');
              const modalElement = document.getElementById('agregarEditarMaterialModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }
            }, error: error => {
              this.sharedService.showAlert('danger', 'Error al actualizar el material');
            }
          }
        );
      } else {
        console.log("Guardando material")
        this.materialSave = {
          isbn: this.materialForm.get('isbn')?.value!,
          titulo: this.materialForm.get('titulo')?.value!,
          cantidad: Number(this.materialForm.get('cantidad')?.value),
          descripcion: this.materialForm.get('descripcion')?.value!,
          idioma: {
            id: Number(this.materialForm.get('idioma')?.value),
            nombre: ''
          },
          autor: {
            id: Number(this.materialForm.get('autor')?.value),
            autor: ''
          },
          categoria: {
            id: Number(this.materialForm.get('categoria')?.value),
            nombre: ''
          },
          estadoMaterial: {
            id: Number(this.materialForm.get('estadoMaterial')?.value),
            estado: ''
          }

        }
        this.materialService.saveMaterial(this.materialSave).subscribe(
          {
            next: data => {
              this.sharedService.showAlert('success', 'Material guardado correctamente');
              this.materialForm.reset();
              const modalElement = document.getElementById('agregarEditarMaterialModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }
            }, error: error => {
              this.sharedService.showAlert('danger', 'Error al guardar el material');
            }
          }
        );
      }
    }
  }

}
