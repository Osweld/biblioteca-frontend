import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  const jwtHelper = inject(JwtHelperService);
  const router = inject(Router);

  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;
  }

  localStorage.clear();
  router.navigate(['/inicio']);
  return false;
};
