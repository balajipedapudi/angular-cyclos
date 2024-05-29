import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route: any, state: any) => {
  const token = localStorage.getItem('token');
  console.log(token);

  const router = inject(Router);
  if (token) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
};

