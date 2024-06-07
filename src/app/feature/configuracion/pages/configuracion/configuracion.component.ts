import { Usuario } from './../../../bibliotecarios/bibliotecario.interface';
import { Component, inject } from '@angular/core';
import { ConfiguracionService } from '../../configuracion.service';
import { SharedService } from '../../../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export default class ConfiguracionComponent {

  usuario!: Usuario;
 usuarioLocalStorage:Usuario = JSON.parse(localStorage.getItem('usuario')!);

  public configuracionService = inject(ConfiguracionService);
  public sharedService = inject(SharedService);
  public fb = inject(FormBuilder);

  passwordForm: FormGroup;
  passwordFormValidationMessage = {
    currentPassword: [
      { type: 'required', message: 'La contraseña actual es requerida' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
      { type: 'maxlength', message: 'La contraseña no debe exceder los 16 caracteres' }
    ],
    newPassword: [
      { type: 'required', message: 'La nueva contraseña es requerida' },
      { type: 'minlength', message: 'La nueva contraseña debe tener al menos 8 caracteres' },
      { type: 'maxlength', message: 'La nueva contraseña no debe exceder los 16 caracteres' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirmar la nueva contraseña es requerido' },
      { type: 'passwordError', message: 'Las contraseñas no coinciden' }
    ]
  };


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


  constructor() {

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, { validators: this.samePassword('newPassword', 'confirmPassword') });

    this.configuracionService.findById(this.usuarioLocalStorage.id).subscribe({
      next: data => {
        this.usuario = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.passwordForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }



  updatePassword() {
    if (this.passwordForm.valid) {
      const passwordDTO = {
        oldPassword: this.passwordForm.get('currentPassword')?.value,
        newPassword: this.passwordForm.get('newPassword')?.value
      }

      console.log(passwordDTO)
      this.configuracionService.updatePassword(this.usuario.id, passwordDTO).subscribe({
        next: () => {
          this.sharedService.showAlert('success','Contraseña actualizada correctamente')
          this.passwordForm.reset();
        },
        error: (error) => {
          this.sharedService.showAlert('danger', 'Error al actualizar la contraseña');
        }
      });
    } else {
      this.sharedService.showAlert('danger', 'Por favor, complete los campos correctamente');
    }
  }






}
