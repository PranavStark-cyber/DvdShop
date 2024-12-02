import { Component, OnInit } from '@angular/core';
import { Customer } from '../../modals/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../Services/Customer/customer.service';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})
export class CustomerDetailsComponent implements OnInit {

  customer!: Customer ;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerservice: CustomerService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');


    if (this.id) {
      this.customerservice.GetCustomerbyId(this.id).subscribe(
        (data) => {
          this.customer = data;
        },
        (error) => {
          console.error('Error fetching DVD details:', error);
        }
      );
    }
  }
}
