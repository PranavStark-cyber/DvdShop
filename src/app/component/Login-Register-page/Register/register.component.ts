import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginandregisterService } from '../../../Services/Loginandregister/loginandregister.service';
import { ToastrService } from 'ngx-toastr';
import { User, Verifyemail } from '../../modals/customer';
import { PasswordStrengthService } from '../../../Services/password-strength.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})export class RegisterComponent {
  signupForm: FormGroup;
  verificationForm: FormGroup; // New form for verification
  submitted = false;
  isVerificationMode = false; // Controls which form to show

  public showPassword: boolean = false;
  passwordStrength: { level: string, message: string } | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginregister: LoginandregisterService,
    private toastr: ToastrService,
    private passwordStrengthService: PasswordStrengthService
  ) {
    // Registration Form
    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        Validators.minLength(8)
      ]],
      Nic: ['', [Validators.required, Validators.pattern(/[0-9]{9}[Vv]|[0-9]{12}/)]],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    // Email Verification Form
    this.verificationForm = this.formBuilder.group({
      verificationCode: ['', Validators.required]
    });
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
  Registeruser() {
    var user = this.signupForm.value;
  
    const userregister: User = {
      firstName: user.FirstName,
      lastName: user.LastName,
      email: user.email,
      nic: user.Nic,
      password: user.password
    };
  
    this.loginregister.register(userregister).subscribe({
      next: (data) => {
        // Assuming the backend returns a success message
        this.toastr.success("Registration successful! A verification code has been sent to your email.", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 4000
        });
        this.isVerificationMode = true;
      },
      error: (error) => {
        // Handle error message from backend
        this.toastr.warning(error.error.message || "User registration failed", "", {
          positionClass: "toast-top-right",
          progressBar: true,
          timeOut: 4000
        });
      }
    });
  }
  

  verifyEmail() {
    const email = this.signupForm.get('email')?.value;
    const code = this.verificationForm.get('verificationCode')?.value;

    const Verifyemail: Verifyemail = {
      email: email,
      otp:code

    };

    this.loginregister.verifyEmail(Verifyemail).subscribe(() => {
      this.toastr.success("Email verified successfully!", "", {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 4000
      });
      this.router.navigate(['/Dvd/Login']);
    }, () => {
      this.toastr.error("Invalid verification code. Please try again.", "", {
        positionClass: "toast-top-right",
        progressBar: true,
        timeOut: 4000
      });
    });
  }

 
}



























// Registeruser() {
//   var user = this.signupForm.value;

//   const userregister: User = {
//     firstName: user.FirstName,
//     lastName: user.LastName,
//     email: user.email,
//     nic: user.Nic,
//     password: user.password
//   };

//   this.loginregister.register(userregister).subscribe(data => {
//     this.toastr.success("Registration successful! A verification code has been sent to your email.", "", {
//       positionClass: "toast-top-right",
//       progressBar: true,
//       timeOut: 4000
//     });
//     this.isVerificationMode = true; 
//   }, error => {
//     this.toastr.warning("User registration failed: " + error.error.title, "", {
//       positionClass: "toast-top-right",
//       progressBar: true,
//       timeOut: 4000
//     });
//   });
// }
