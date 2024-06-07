import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedInGuard } from './core/guards/logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: '', loadChildren: () => import('./feature/layout/layout.routes').then(m => m.LAYOUT_ROUTES),
    canActivate: [authGuard]
  },
  {path: '', loadChildren: () => import('./feature/home/home.routes').then(m => m.HOME_ROUTES),
    canActivate: [loggedInGuard]
  },
  {path: '', loadChildren: () => import('./core/auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate: [loggedInGuard]
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];
