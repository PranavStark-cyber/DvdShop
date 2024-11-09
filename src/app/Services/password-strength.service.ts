import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {

  constructor() { }

  calculatePasswordStrength(password: string) {
    const length = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);

    let strength = 0;
    if (length >= 8) strength++;               
    if (hasUpperCase) strength++;            
    if (hasLowerCase) strength++;              
    if (hasNumbers) strength++;              
    if (hasSpecialChar) strength++;            

    let level: string;
    let message: string;

    switch (strength) {
      case 0:
      case 1:
        level = 'weak';
        message = 'Password is too weak';
        break;
      case 2:
        level = 'medium';
        message = 'Password is medium';
        break;
      case 3:
      case 4:
        level = 'strong';
        message = 'Password is strong';
        break;
      default:
        level = 'strongest';
        message = 'Password is too Strongest';
        break;
    }

    return { level, message };
  }
}
