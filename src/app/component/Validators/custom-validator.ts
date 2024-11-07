import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['minlength'] = 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = 'Password must include at least one uppercase letter.';
    }
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = 'Password must include at least one lowercase letter.';
    }
    if (!/\d/.test(value)) {
      errors['number'] = 'Password must include at least one number.';
    }
    if (!/[@$!%*?&]/.test(value)) {
      errors['specialCharacter'] = 'Password must include at least one special character.';
    }

    return Object.keys(errors).length ? errors : null;
  };
}
