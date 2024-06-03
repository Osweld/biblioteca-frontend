import { Routes } from '@angular/router';


export const BIBLIOTECARIOS_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/bibliotecarios/bibliotecarios.component')},
]
