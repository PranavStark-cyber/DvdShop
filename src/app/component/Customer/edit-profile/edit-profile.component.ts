import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../modals/customer';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  profileForm!: FormGroup;
  customerId!: string;
 

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.decodeCustomerIdFromToken();
    if (this.customerId) {
      this.loadCustomerData(this.customerId);  // Load data after setting customerId
    }

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nic: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: this.fb.group({  // Address as a nested FormGroup
        street: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }

  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.customerId = decodedToken.Id;
    }
  }

  loadCustomerData(id: string): void {
    this.customerService.GetCustomerbyId(id).subscribe(
      (data) => {
        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          nic: data.nic,
          phoneNumber: data.phoneNumber || '',
          address: {  
            id:data.address?.id||'',// Patch the nested address fields
            street: data.address?.street || '',
            city: data.address?.city || '',
            country: data.address?.country || ''
          }
        });
        console.log('success');
      },
      (error) => {
        this.toastr.error('Failed to load customer data.', 'Error');
        console.error(error);
      }
    );
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      this.toastr.warning('Please fill all required fields.', 'Validation Error');
      return;
    }

    const updatedData = {
      
      ...this.profileForm.value,
      id: this.customerId
    };
    delete updatedData.email;
    this.customerService.updatecustomer(this.customerId, updatedData).subscribe(
      () => {
        this.toastr.success('Profile updated successfully.', 'Success');
      },
      (error) => {
        this.toastr.error('Failed to update profile.', 'Error');
        console.error(error);
      }
    );
  }

  cancelEdit(): void {
    this.loadCustomerData(this.customerId);
  }

 Back():void{
  window.history.back();
 }



  countries:string[] = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)",
    "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ]; // Sample country list
}
