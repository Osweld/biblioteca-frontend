import { Routes } from "@angular/router";

export const DEVOLUCIONES_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/devoluciones/devoluciones.component')},
]
