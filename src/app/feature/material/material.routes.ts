import { Routes } from "@angular/router";


export const MATERIAL_ROUTES: Routes = [
  {path: '', loadComponent: () => import('./pages/material/material.component')},
]
