import { Routes } from "@angular/router";

export const MIEMBROS_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/miembros/miembros.component')},
]
