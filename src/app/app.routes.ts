import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: '', loadChildren: () => import('./feature/layout/layout.routes').then(m => m.LAYOUT_ROUTES)},
  {path: '', loadChildren: () => import('./feature/home/home.routes').then(m => m.HOME_ROUTES)},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];
