import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginandregisterService } from '../../../Services/Loginandregister/loginandregister.service';
import { customValidator } from '../../Validators/custom-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

signinForm:FormGroup;
submitted = false;

public showPassword: boolean = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
constructor(private formBuilder: FormBuilder, private rout: Router ,private loginregister:LoginandregisterService,private toastr:ToastrService) {
  this.signinForm = this.formBuilder.group({
    Nic: ['', [Validators.required, Validators.pattern(/[0-9]{9}[Vv]|[0-9]{12}/)]],
    password: ['', [Validators.required, customValidator()]],
    rememberMe:['']
  })
}


Loginuser() {
  this.loginregister.Loginuser(this.signinForm.value).subscribe({
    next: (res:any) => {
      this.toastr.success("User Login Successfully.." , "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    },complete:()=>{
      this.rout.navigate(['/home'])
    },error:(error:any)=>{
      this.toastr.warning( error.error, "" , {
        positionClass:"toast-top-right",
        progressBar:true,
        timeOut:4000
      })
    }
  })
}

}
