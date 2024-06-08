import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/shared.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-recuperar-password-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './recuperar-password-modal.component.html',
  styleUrl: './recuperar-password-modal.component.css'
})
export class RecuperarPasswordModalComponent {

  public authService = inject(AuthService);
  public sharedService = inject(SharedService);
  public fb = inject(FormBuilder);

  recuperarPasswordForm: FormGroup;

  constructor() {
    this.recuperarPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.recuperarPasswordForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  recuperarPasswordFormValidationMessages = {
    email: [
      { type: 'required', message: 'El correo electrónico es requerido' },
      { type: 'email', message: 'Introduce un correo electrónico válido' }
    ]
  };

  onModalShown() {
    this.recuperarPasswordForm.reset();
  }


  onSubmit() {
    if (this.recuperarPasswordForm.valid) {
      this.authService.resetPassword(this.recuperarPasswordForm.value.email).subscribe({
        next: data => {
          console.log(data);
          this.sharedService.showAlert('success', 'Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña. Revisa tu bandeja de entrada o la carpeta de spam.');
          const modalElement = document.getElementById('recuperarPasswordModal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            modal!.hide();
          }
        },
        error: (error) => {
          console.error(error);
          this.sharedService.showAlert('danger', 'Ha ocurrido un error al intentar recuperar tu contraseña. Revisa que el correo electrónico sea correcto y vuelve a intentarlo.');
        }

      });

    }

  }

}
