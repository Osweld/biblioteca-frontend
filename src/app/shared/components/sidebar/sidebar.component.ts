import { Usuario } from './../../../feature/configuracion/configuracion.interface';
import { Component, inject } from '@angular/core';
import { SidebarMenu } from '../../shared.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  Usuario: Usuario = JSON.parse(localStorage.getItem('usuario')!);
  horaActual?: string;
  fecha = new Date();
  public router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);

  ngOnInit(): void {
    this.actualizarHora();
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.actualizarHora();
      }, 1000);
    });
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString();
    this.cdr.detectChanges();
  }

  sidebarMenu: SidebarMenu[] = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Material', route: '/material' },
    { name: 'Autores', route: '/autores' },
    { name: 'Miembros', route: '/miembros' },
    { name: 'Bibliotecario', route: '/bibliotecarios' },
    { name: 'Prestamos', route: '/prestamos' },
    { name: 'Pagos', route: '/pagos' },
    { name: 'Egresos', route: '/egresos' },
  ];

  logout() {
    localStorage.clear();
    this.router.navigate(['/inicio']);
  }
}
