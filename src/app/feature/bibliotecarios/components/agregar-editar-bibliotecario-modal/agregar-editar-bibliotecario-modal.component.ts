import { Genero, UsuarioSave } from './../../bibliotecario.interface';
import { Component, Input, inject } from '@angular/core';
import { Usuario } from '../../bibliotecario.interface';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BibliotecariosService } from '../../bibliotecarios.service';
import { SharedService } from '../../../../shared/shared.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-agregar-editar-bibliotecario-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar-bibliotecario-modal.component.html',
  styleUrl: './agregar-editar-bibliotecario-modal.component.css'
})
export class AgregarEditarBibliotecarioModalComponent {
  @Input() usuario?: Usuario;
  usuarioSave!: UsuarioSave;


  usuarioForm: FormGroup;
  generos: Genero[] = [];

  public bibliotecaService = inject(BibliotecariosService);
  public sharedService = inject(SharedService);


  constructor(private fb: FormBuilder) {
    this.bibliotecaService.getGenero().subscribe({
      next: (data: Genero[]) => {
        this.generos = data;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.usuarioForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      repeatPassword: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      direccion: ['', [Validators.minLength(8), Validators.maxLength(150)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      dui: ['', [Validators.required, Validators.pattern('^[0-9]{8}-[0-9]{1}$')]],
    }, { validators: this.samePassword('password', 'repeatPassword') });
  }

  usuarioFormValidationMessage = {
    'username': [
      { type: 'required', message: 'El nombre de usuario es requerido.' },
      { type: 'minlength', message: 'El nombre de usuario debe tener al menos 2 caracteres.' },
      { type: 'maxlength', message: 'El nombre de usuario no puede sobrepasar los 50 caracteres.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.' },
      { type: 'maxlength', message: 'La contraseña no puede sobrepasar los 16 caracteres.' }
    ],
    'repeatPassword': [
      { type: 'required', message: 'La confirmación de contraseña es requerida.' },
      {type: 'passwordError', message: 'Los password no coinciden' }
    ],
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
    ]
  };

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    return password && repeatPassword && password.value !== repeatPassword.value ? { 'mismatch': true } : null;
  }

  samePassword(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(field1)?.value;
      const pass2 = formGroup.get(field2)?.value;

      if (pass1 !== pass2) {
        formGroup.get(field2)?.setErrors({
          passwordError: true
        })
        return { passwordError: true }
      } else {
        formGroup.get(field2)?.setErrors(null);
        return null;
      }
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.usuarioForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onModalShown() {
    this.usuarioForm.reset();
    if (this.usuario) {
      this.usuarioForm.reset({
        username: this.usuario.username,
        nombre: this.usuario.persona.nombre,
        apellido: this.usuario.persona.apellido,
        email: this.usuario.persona.email,
        telefono: this.usuario.persona.telefono,
        direccion: this.usuario.persona.direccion,
        fechaNacimiento: this.usuario.persona.fechaNacimiento,
        genero: this.usuario.persona.genero.id,
        dui: this.usuario.persona.dui,
      });

      //seteamos los valores de password para que no de error y es necesario ocultarlo en el formulario
      this.usuarioForm.get('username')?.setValue('username');
      this.usuarioForm.get('password')?.setValue('password');
      this.usuarioForm.get('repeatPassword')?.setValue('password');
    }
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      if (this.usuario) {
        this.usuarioSave = {
          id: this.usuario.id,
          username: this.usuarioForm.get('username')?.value,
          password: this.usuarioForm.get('password')?.value,
          persona: {
            nombre: this.usuarioForm.get('nombre')?.value,
            apellido: this.usuarioForm.get('apellido')?.value,
            email: this.usuarioForm.get('email')?.value,
            telefono: this.usuarioForm.get('telefono')?.value,
            direccion: this.usuarioForm.get('direccion')?.value,
            fechaNacimiento: this.usuarioForm.get('fechaNacimiento')?.value,
            genero: {
              id: this.usuarioForm.get('genero')?.value,
              nombre: '',
            },
            dui: this.usuarioForm.get('dui')?.value
          }
        };
        this.bibliotecaService.update(this.usuarioSave).subscribe({
          next: (data) => {
            this.sharedService.showAlert('success', 'Bibliotecario actualizado correctamente');
            this.usuarioForm.reset();
            const modalElement = document.getElementById('agregarEditarUsuarioModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              modal!.hide();
            }

          },
          error: (error) => {
            this.sharedService.showAlert('danger', 'Error al actualizar el bibliotecario');
          }
        });
      } else {

        this.usuarioSave = {
          username: this.usuarioForm.get('username')?.value,
          password: this.usuarioForm.get('password')?.value,
          persona: {
            nombre: this.usuarioForm.get('nombre')?.value,
            apellido: this.usuarioForm.get('apellido')?.value,
            email: this.usuarioForm.get('email')?.value,
            telefono: this.usuarioForm.get('telefono')?.value,
            direccion: this.usuarioForm.get('direccion')?.value,
            fechaNacimiento: this.usuarioForm.get('fechaNacimiento')?.value,
            genero: {
              id: this.usuarioForm.get('genero')?.value,
              nombre: '',
            },
            dui: this.usuarioForm.get('dui')?.value
          }
        };


        this.bibliotecaService.save(this.usuarioSave).subscribe({
          next: (data) => {
            this.sharedService.showAlert('success', 'Bibliotecario creado correctamente');
            this.usuarioForm.reset();
            const modalElement = document.getElementById('agregarEditarUsuarioModal');
            if (modalElement) {
              const modal = Modal.getInstance(modalElement);
              modal!.hide();
            }
          },
          error: (error) => {
            this.sharedService.showAlert('danger', 'Error al crear el bibliotecario');
          }
        });
      }
    }
  }


  onModalHidden() {
    console.log('Modal hidden')
  }


}
