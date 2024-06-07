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
    {name:'Autores', route: '/autores'},
    {name:'Miembros', route: '/miembros'},
    {name:'Bibliotecario', route: '/bibliotecarios'},
    {name:'Prestamos', route: '/prestamos'},
    {name:'Pagos', route: '/pagos'},
    {name:'Egresos', route: '/egresos'},
  ]


  logout(){
    console.log('logout');
  }
}
