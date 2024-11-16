import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginandregisterService } from '../../../Services/Loginandregister/loginandregister.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../modals/customer';
import { PasswordStrengthService } from '../../../Services/password-strength.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signupForm: FormGroup;
  submitted = false;

  public showPassword: boolean = false;
  passwordStrength: { level: string, message: string } | null = null;



  constructor(private formBuilder: FormBuilder, private rout: Router ,private loginregister:LoginandregisterService,private toastr:ToastrService,    private passwordStrengthService: PasswordStrengthService) {
    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), // Default pattern for password
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), // Default pattern for password
        Validators.minLength(8)
      ]],
      Nic: ['', [Validators.required, Validators.pattern(/[0-9]{9}[Vv]|[0-9]{12}/)]],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator })
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onPasswordChange() {
    const password = this.signupForm.get('password')?.value;
    this.passwordStrength = this.passwordStrengthService.calculatePasswordStrength(password);
  }

  Registeruser(){
    var user = this.signupForm.value;

    const userregister:User ={
      firstName:user.FirstName,
      lastName:user.LastName,
      email:user.email, 
      nic:user.Nic,
      password:user.password
    }

    this.loginregister.register(userregister).subscribe(data=>{
      this.toastr.success("User Added Successfully..", "", {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 4000
    })
    this.rout.navigate(['/Dvd/Login'])
  },error => {
    this.toastr.warning("User : " + error.error.title, "", {
      positionClass: "toast-top-right",
      progressBar: true,
      timeOut: 4000
    })
  })
}
}