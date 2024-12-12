import { CanActivateFn, Router } from '@angular/router';
import { LoginandregisterService } from '../Services/Loginandregister/loginandregister.service';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginandregisterService);
  const router = inject(Router);  // Inject the router correctly

  
    // If user is logged in, redirect to the respective page (manager or customer)
    if (authService.isLoggedin()) {
      const role = localStorage.getItem('Role');
      
      if (role === 'Manager') {
        // Redirect to manager dashboard if the user is an admin
        router.navigate(['/Manager']);
      } else if (role === 'Customer') {
        // Redirect to customer dashboard if the user is a customer
        router.navigate(['/Customer/Home']);
      }

      return false;  // Block access to login page
    }

    // If the user is not logged in, allow access to the login page
    return true;

};
