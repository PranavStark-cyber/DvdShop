import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Customer, Rental, RentalStatus } from '../../modals/customer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RentalService } from '../../../Services/Customer/rental.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { jwtDecode } from 'jwt-decode';
import { CustomerService } from '../../../Services/Customer/customer.service';

interface ChartCanvas extends HTMLCanvasElement {
  chart?: Chart;
}
@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent implements OnInit {
  customerid: string | null = null;
  customer: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.decodeCustomerIdFromToken();
    this.loadCustomerData();
  }

  ngAfterViewInit() {
    // Ensure chart is generated after the view is fully initialized
    this.generateRentalStatusChart();
  }

  /**
   * Decode the customer ID from JWT token stored in localStorage.
   */
  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.customerid = decodedToken.Id;
    }
  }
  Back():void{
    window.history.back();
   }
  
  /**
   * Load customer data by customer ID.
   */
  loadCustomerData() {
    if (!this.customerid) return;

    this.customerService.GetCustomerbyId(this.customerid).subscribe(
      (data) => {
        this.customer = data;
        this.loading = false;
        this.cdr.detectChanges(); // Trigger change detection to render chart
        this.generateRentalStatusChart();  // Generate chart after data is fetched
      },
      (error) => {
        this.error = "Failed to load data. Please try again later.";
        this.loading = false;
      }
    );
  }

  generateRentalStatusChart() {
    if (!this.customer || !this.customer.rentals || this.customer.rentals.length === 0) {
      console.log("No rentals data to display on the chart.");
      return;
    }

    // Initialize the statusCounts object to count each status type
    const statusCounts: { [key in string]: number } = {
      'Request': 0,
      'Approved': 0,
      'Collected': 0,
      'Returned': 0,
      'Rejected': 0
    };

    // Map the numeric rental status to human-readable status names
    this.customer.rentals.forEach((rental: any) => {
      if (rental.status !== undefined) {
        switch (rental.status) {
          case 0: // Assuming 0 means 'Request'
            statusCounts['Request']++;
            break;
          case 1: // Assuming 1 means 'Approved'
            statusCounts['Approved']++;
            break;
          case 2: // Assuming 2 means 'Collected'
            statusCounts['Collected']++;
            break;
          case 3: // Assuming 3 means 'Returned'
            statusCounts['Returned']++;
            break;
          case 4: // Assuming 4 means 'Rejected'
            statusCounts['Rejected']++;
            break;
          default:
            console.log(`Unknown rental status: ${rental.status}`);
        }
      }
    });

    // Prepare the chart data
    const chartData = {
      labels: ['Request', 'Approved', 'Collected', 'Returned', 'Rejected'],
      datasets: [
        {
          data: [
            statusCounts['Request'],
            statusCounts['Approved'],
            statusCounts['Collected'],
            statusCounts['Returned'],
            statusCounts['Rejected']
          ],
          backgroundColor: this.generateGradientColors(), // Customize colors if needed
        }
      ]
    };

    // Get the chart canvas element
    const chartElement = document.getElementById('rentalStatusChart') as ChartCanvas;

    if (chartElement) {
      // Destroy previous chart if it exists
      if (chartElement.chart) {
        chartElement.chart.destroy();
      }

      // Create a new chart instance
      const chart = new Chart(chartElement, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 80, // Width of the color box in the legend
                padding: 15, // Space between the color box and label
                font: {
                  size: 8, // Font size for legend labels
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.label + ': ' + tooltipItem.raw + ' rentals';
                }
              }
            }
          }
        }
      });

      // Store the chart instance in the canvas element for future use
      chartElement.chart = chart;
    } else {
      console.error('Chart canvas element not found!');
    }
  }
  // Function to generate gradient colors
  generateGradientColors() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const gradients = [
      ctx.createLinearGradient(0, 0, 0, 400),
      ctx.createLinearGradient(0, 0, 0, 400),
      ctx.createLinearGradient(0, 0, 0, 400),
      ctx.createLinearGradient(0, 0, 0, 400),
      ctx.createLinearGradient(0, 0, 0, 400)
    ];

    gradients[0].addColorStop(0, '#FF5733'); // Red to Orange
    gradients[0].addColorStop(1, '#FF9A8B');

    gradients[1].addColorStop(0, '#4CAF50'); // Green to Light Green
    gradients[1].addColorStop(1, '#8BC34A');

    gradients[2].addColorStop(0, '#2196F3'); // Blue to Light Blue
    gradients[2].addColorStop(1, '#64B5F6');

    gradients[3].addColorStop(0, '#FFC107'); // Yellow to Light Yellow
    gradients[3].addColorStop(1, '#FFEB3B');

    gradients[4].addColorStop(0, '#9E9E9E'); // Grey to Light Grey
    gradients[4].addColorStop(1, '#BDBDBD');

    return gradients;
  }
}
