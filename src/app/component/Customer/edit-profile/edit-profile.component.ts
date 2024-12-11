import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../modals/customer';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  profileForm!: FormGroup;
profileImage: any;
isDisabled = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nic:  [{value: '', disabled: true}, [Validators.required]],
      phone: [''],
      gender: ['Male'],
      language: ['English'],
      address: [''],
      country: [''],
    });
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
