import { Component, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { SharedService } from '../../../../shared/shared.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecuperarPasswordModalComponent } from '../../components/recuperar-password-modal/recuperar-password-modal.component';
import { Modal } from 'bootstrap';
import { Login, LoginResponse, Usuario } from '../../login.interface';
import { Router } from '@angular/router';

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
  public router = inject(Router);

  login?:Login
  loginResponse!:LoginResponse;
  usuario!:Usuario;

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
    if(this.loginForm.valid){
      this.login = {
        username: this.loginForm.get('usuario')?.value,
        password: this.loginForm.get('password')?.value
      }
    this.authService.login(this.login).subscribe({
      next: response =>{
        this.loginResponse = response;
        localStorage.setItem("token",this.loginResponse.token);
        localStorage.setItem("user",JSON.stringify(this.loginResponse.user));
        this.authService.findUsuarioById(this.loginResponse.user.id!).subscribe({
          next: response => {
            this.usuario = response;
            localStorage.setItem("bibliotecario",JSON.stringify(this.usuario.persona));
            localStorage.setItem("usuario",JSON.stringify(this.usuario));
          }
        });
        this.sharedService.showAlert('success','Bienvenido inicio de sesión exitoso');
        this.router.navigate(['/dashboard'])
      },error: error => {
        this.sharedService.showAlert('danger','Error al iniciar sesión, verifique sus credenciales');
      }
    })
    }
  }

  recuperarPassword(){
    const modalElement = document.getElementById('recuperarPasswordModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

}
