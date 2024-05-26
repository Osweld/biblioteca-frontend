import { Routes } from "@angular/router";


export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/layout.component'), children: [
      {path: 'dashboard', loadComponent: () => import('../dashboard/pages/dashboard/dashboard.component')},
    ]
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
]
