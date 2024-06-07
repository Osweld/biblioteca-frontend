import { Usuario } from './../../../feature/configuracion/configuracion.interface';
import { Component, inject } from '@angular/core';
import { SidebarMenu } from '../../shared.interface';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {
    this.actualizarHora();
    setInterval(() => {
      this.actualizarHora();
    }, 1000);
  }

  actualizarHora(): void {
    const ahora = new Date();
    this.horaActual = ahora.toLocaleTimeString();
  }

  sidebarMenu: SidebarMenu[] = [
    {name: 'Dashboard', route: '/dashboard'},
    {name:'Material', route: '/material'},
    {name:'Autores', route: '/autores'},
    {name:'Miembros', route: '/miembros'},
    {name:'Bibliotecario', route: '/bibliotecarios'},
    {name:'Prestamos', route: '/prestamos'},
    {name:'Pagos', route: '/pagos'},
    {name:'Egresos', route: '/egresos'},
  ]


  logout(){
    localStorage.clear()
    this.router.navigate(['/inicio']);
  }
}
