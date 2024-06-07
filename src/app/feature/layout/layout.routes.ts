import { Routes } from "@angular/router";
import {EgresosComponent} from "../egresos/pages/egresos/egresos.component";
import { PagosComponent } from "../pagos/pages/pagos/pagos.component";
import { AutoresComponent } from "../autores/pages/autores/autores.component";


export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout.component'), children: [
      {path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)},
      {path:'material',loadChildren: () => import('../material/material.routes').then(m => m.MATERIAL_ROUTES)},
      {path:'miembros',loadChildren: () => import('../miembros/miembros.routes').then(m => m.MIEMBROS_ROUTES)},
      {path:'bibliotecarios',loadChildren: () => import('../bibliotecarios/bibliotecarios.routes').then(m => m.BIBLIOTECARIOS_ROUTES)},
      {path:'prestamos',loadChildren: () => import('../prestamos/prestamos.routes').then(m => m.PRESTAMOS_ROUTES)},
      {path:'configuracion',loadChildren: () => import('../configuracion/configuracion.routes').then(m => m.CONFIGURACION_ROUTES)},
      {path:'pagos', component: PagosComponent},
      {path:'egresos', component: EgresosComponent},
      {path:'autores',component: AutoresComponent},
    ]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
]
