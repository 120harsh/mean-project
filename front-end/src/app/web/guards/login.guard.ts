import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GuardService } from '../services/guard.service';


export const logedIn: CanActivateFn = () => {
   const loginService = inject(GuardService);
   const redirectRoute = inject(Router);
  if(loginService.getLoginDetails()){
    redirectRoute.navigate(['user/home']);
    return false;
  }
  return true;
};

export const logout: CanActivateFn = () => {
   const loginService = inject(GuardService);
   const redirectRoute = inject(Router);
  if(!loginService.getLoginDetails()){
    redirectRoute.navigate(['login']);
    return false;
  }
  return true;
};
