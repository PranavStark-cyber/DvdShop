import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginandregisterService } from '../Services/Loginandregister/loginandregister.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginandregisterService);
  const router = new Router();

  if(authService.isLoggedin()){
    const role = localStorage.getItem("Role")
    if(role == "Manager"){
      return true
    }else if(role == "Customer"){
      return false
    }
    return true
  }else{
    router.navigate(['/login']);
    return false;
  }
};
