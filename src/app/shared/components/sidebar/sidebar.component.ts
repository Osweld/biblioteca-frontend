import { Component } from '@angular/core';
import { SidebarMenu } from '../../shared.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  sidebarMenu: SidebarMenu[] = [
    {name: 'Dashboard', route: '/dashboard'},
    {name:'Material', route: '/material'},
    {name:'Miembros', route: '/miembros'},
    {name:'Bibliotecario', route: '/bibliotecarios'},
    {name:'Prestamos', route: '/prestamos'},
    {name:'Devoluciones', route: '/devoluciones'},
  ]
}
