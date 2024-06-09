import { Routes } from "@angular/router";
import {EgresosComponent} from "../egresos/pages/egresos/egresos.component";
import { PagosComponent } from "../pagos/pages/pagos/pagos.component";
import { AutoresComponent } from "../autores/pages/autores/autores.component";
import { authGuard } from "../../core/guards/auth.guard";


export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout.component'), canActivate: [authGuard], children: [
      {path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
        canActivate: [authGuard]
      },
      {path:'material',loadChildren: () => import('../material/material.routes').then(m => m.MATERIAL_ROUTES), canActivate: [authGuard]},
      {path:'miembros',loadChildren: () => import('../miembros/miembros.routes').then(m => m.MIEMBROS_ROUTES)},
      {path:'bibliotecarios',loadChildren: () => import('../bibliotecarios/bibliotecarios.routes').then(m => m.BIBLIOTECARIOS_ROUTES), canActivate: [authGuard]},
      {path:'prestamos',loadChildren: () => import('../prestamos/prestamos.routes').then(m => m.PRESTAMOS_ROUTES), canActivate: [authGuard]},
      {path:'configuracion',loadChildren: () => import('../configuracion/configuracion.routes').then(m => m.CONFIGURACION_ROUTES), canActivate: [authGuard]},
      {path:'pagos', component: PagosComponent, canActivate: [authGuard]},
      {path:'egresos', component: EgresosComponent, canActivate: [authGuard]},
      {path:'autores',component: AutoresComponent, canActivate: [authGuard]},
    ]
  }
]
