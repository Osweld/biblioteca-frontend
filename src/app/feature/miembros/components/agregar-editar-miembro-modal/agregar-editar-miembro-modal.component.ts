import { MiembroSave } from './../../miembros.interface';
import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoUsuario, Genero, Miembro, Rol } from '../../miembros.interface';
import { MiembrosService } from '../../miembros.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-agregar-editar-miembro-modal',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-editar-miembro-modal.component.html',
  styleUrl: './agregar-editar-miembro-modal.component.css'
})
export class AgregarEditarMiembroModalComponent {

@Input() miembro?: Miembro;
MiembroSave!: MiembroSave;

  miembroForm: FormGroup;
  estadosUsuario:EstadoUsuario[] = [];
  generos:Genero[] = [];
  roles:Rol[] = [];


  public miembroService = inject(MiembrosService);
  public sharedService = inject(SharedService);


  miembroFormValidationMessage = {
    'nombre': [
      { type: 'required', message: 'El nombre es requerido.' },
      { type: 'minlength', message: 'El nombre debe tener al menos 2 caracteres.' },
      { type: 'maxlength', message: 'El nombre no puede sobrepasar los 50 caracteres.' }
    ],
    'apellido': [
      { type: 'required', message: 'El apellido es requerido.' },
      { type: 'minlength', message: 'El apellido debe tener al menos 2 caracteres.' },
      { type: 'maxlength', message: 'El apellido no puede sobrepasar los 50 caracteres.' }
    ],
    'email': [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'email', message: 'Email no válido.' },
      { type: 'maxlength', message: 'El email no puede sobrepasar los 50 caracteres.' }
    ],
    'telefono': [
      { type: 'required', message: 'El teléfono es requerido.' },
      { type: 'minlength', message: 'El teléfono debe tener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'El teléfono no puede sobrepasar los 15 caracteres.' },
      { type: 'pattern', message: 'El teléfono solo puede contener números.' }
    ],
    'direccion': [
      { type: 'minlength', message: 'La dirección debe tener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'La dirección no puede sobrepasar los 150 caracteres.' }
    ],
    'fechaNacimiento': [
      { type: 'required', message: 'La fecha de nacimiento es requerida.' }
    ],
    'genero': [
      { type: 'required', message: 'El género es requerido.' }
    ],
    'dui': [
      { type: 'required', message: 'El DUI es requerido.' },
      { type: 'pattern', message: 'El DUI debe seguir el patrón ########-#.' }
    ],
    'rol': [
      { type: 'required', message: 'El rol es requerido.' }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.miembroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      direccion: ['', [Validators.minLength(8), Validators.maxLength(150)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      dui: ['', [Validators.required, Validators.pattern('^[0-9]{8}-[0-9]{1}$')]],
      rol: ['', Validators.required]
    });

    this.miembroService.getEstadoUsuario().subscribe((estadoUsuario) => {
      this.estadosUsuario = estadoUsuario;
    });

    this.miembroService.getGenero().subscribe((genero) => {
      this.generos = genero;
    });

    this.miembroService.getRol().subscribe((rol) => {
      this.roles = rol;
    });

  }

  isFieldInvalid(field: string): boolean {
    const control = this.miembroForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onModalShown(){
    this.miembroForm.reset();
    if (this.miembro) {
      this.miembroForm.reset({
        nombre: this.miembro.nombre,
        apellido: this.miembro.apellido,
        email: this.miembro.email,
        telefono: this.miembro.telefono,
        direccion: this.miembro.direccion,
        fechaNacimiento: this.miembro.fechaNacimiento,
        genero: this.miembro.genero.id,
        dui: this.miembro.dui,
        rol: this.miembro.rol.id
      });
    }
  }

  onSubmit(): void {
    if (this.miembroForm.valid) {

      if (this.miembro) {
        console.log("Actualizando miembro");
        this.MiembroSave = {
          id: this.miembro.id,
          nombre: this.miembroForm.get('nombre')?.value!,
          apellido: this.miembroForm.get('apellido')?.value!,
          email: this.miembroForm.get('email')?.value!,
          telefono: this.miembroForm.get('telefono')?.value!,
          direccion: this.miembroForm.get('direccion')?.value!,
          fechaNacimiento: this.miembroForm.get('fechaNacimiento')?.value!,
          genero: {
            id: Number(this.miembroForm.get('genero')?.value),
            nombre: ''
          },
          dui: this.miembroForm.get('dui')?.value!,
          rol: {
            id: Number(this.miembroForm.get('rol')?.value),
            rol: ''
          }
        };

        this.miembroService.updateMiembro(this.MiembroSave).subscribe(
          {
            next: data => {
              this.miembroForm.reset();
              this.sharedService.showAlert('success', 'Miembro actualizado correctamente');
              const modalElement = document.getElementById('agregarEditarMiembroModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }
            },
            error: error => {
              this.sharedService.showAlert('danger', 'Error al actualizar el miembro');
            }
          }
        );
      } else {
        console.log("Guardando miembro");
        this.MiembroSave = {
          nombre: this.miembroForm.get('nombre')?.value!,
          apellido: this.miembroForm.get('apellido')?.value!,
          email: this.miembroForm.get('email')?.value!,
          telefono: this.miembroForm.get('telefono')?.value!,
          direccion: this.miembroForm.get('direccion')?.value!,
          fechaNacimiento: this.miembroForm.get('fechaNacimiento')?.value!,
          genero: {
            id: Number(this.miembroForm.get('genero')?.value),
            nombre: ''
          },
          dui: this.miembroForm.get('dui')?.value!,
          rol: {
            id: Number(this.miembroForm.get('rol')?.value),
            rol: ''
          }
        };

        this.miembroService.addMiembro(this.MiembroSave).subscribe(
          {
            next: data => {
              this.sharedService.showAlert('success', 'Miembro guardado correctamente');
              this.miembroForm.reset();
              const modalElement = document.getElementById('agregarEditarMiembroModal');
              if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                modal!.hide();
              }
            },
            error: error => {
              this.sharedService.showAlert('danger', 'Error al guardar el miembro');
            }
          }
        );
      }
    }
  }
}
