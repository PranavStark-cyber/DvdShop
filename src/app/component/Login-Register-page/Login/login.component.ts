import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginandregisterService } from '../../../Services/Loginandregister/loginandregister.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordStrengthService } from '../../../Services/password-strength.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  signinForm: FormGroup;
  submitted = false;
  public showPassword: boolean = false;
  passwordStrength: { level: string, message: string } | null = null;

  constructor(private formBuilder: FormBuilder,
    private rout: Router,
    private loginregister: LoginandregisterService,
    private toastr: ToastrService,
    private passwordStrengthService: PasswordStrengthService) {
    this.signinForm = this.formBuilder.group({
      Nic: ['', [Validators.required, Validators.pattern(/[0-9]{9}[Vv]|[0-9]{12}/)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), // Default pattern for password
        Validators.minLength(8)
      ]],
      rememberMe: ['']
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onPasswordChange() {
    const password = this.signinForm.get('password')?.value;
    this.passwordStrength = this.passwordStrengthService.calculatePasswordStrength(password);
  }

  Loginuser() {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }

    this.loginregister.Loginuser(this.signinForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success("User Login Successfully..", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 4000
        });
      },
      complete: () => {
        this.rout.navigate(['/home']);
      },
      error: (error: any) => {
        this.toastr.warning(error.error, "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 4000
        });
      }
    });
  }

}
