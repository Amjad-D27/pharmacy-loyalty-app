import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  
  const localData = localStorage.getItem("isAdminAuthenticated");
  if (localData != null) {
    return true;
  }
  else {
    router.navigateByUrl('dashboard');
    return false;
  }

};
