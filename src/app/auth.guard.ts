import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route:any, state:any) => {
  const token=localStorage.getItem('token');
  console.log(token);
  
  const router=inject(Router);
  if(token){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
