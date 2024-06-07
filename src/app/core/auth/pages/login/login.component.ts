import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { SharedService } from '../../../../shared/shared.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecuperarPasswordModalComponent } from '../../components/recuperar-password-modal/recuperar-password-modal.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RecuperarPasswordModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  @ViewChild(RecuperarPasswordModalComponent) recuperarPasswordModal: any;

  public authService = inject(AuthService);
  public sharedService = inject(SharedService);
  public fb = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }


  loginFormValidationMessages = {
    usuario: [
      { type: 'required', message: 'El nombre de usuario es requerido' },
      { type: 'minlength', message: 'El nombre de usuario debe tener al menos 3 caracteres' },
      { type: 'maxlength', message: 'El nombre de usuario no debe exceder los 20 caracteres' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' },
      { type: 'maxlength', message: 'La contraseña no debe exceder los 16 caracteres' }
    ]
  };

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  onSubmit(){

  }

  recuperarPassword(){
    const modalElement = document.getElementById('recuperarPasswordModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
