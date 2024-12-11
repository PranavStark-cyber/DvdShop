import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../modals/customer';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  customerId!: string;
  customer!: Customer

  constructor(private route: ActivatedRoute, private customerservice: CustomerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('id') || '';
      console.log('Customer ID from URL:', this.customerId);
    });
   this.fetchdata()

  }
  getTotalPayments(): number {
    return this.customer.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  }
  fetchdata() {
    this.customerservice.GetCustomerbyId(this.customerId).subscribe((data) => {
      this.customer = data
      this.createChart();
    })
  }

  createChart(): void {
    new Chart('practiceChart', {
      type: 'doughnut',
      data: {
        labels: this.customer.payments!.map((area: any) => area.name),
        datasets: [
          {
            data: this.customer.payments!.map((area: any) => area.percentage),
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
}
