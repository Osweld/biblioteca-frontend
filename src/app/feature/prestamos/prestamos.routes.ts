import { Routes } from "@angular/router";


export const PRESTAMOS_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/prestamos/prestamos.component')}
]
