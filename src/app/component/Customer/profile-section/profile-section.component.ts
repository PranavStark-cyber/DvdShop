import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Customer, Rental, RentalStatus } from '../../modals/customer';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../../Services/Customer/rental.service';
import { catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.css']
})
export class ProfileSectionComponent implements OnInit {
  rental: Rental | null = null;
  loading = false;
  error: string | null = null;
  customerid!: string;
  rentalChartData: any[] = [];
  rentalChartLabels: string[] = [];
  private rentalStatusChart: Chart | null = null;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      try {
        const decodedToken: any = jwtDecode(jwtToken);
        this.customerid = decodedToken.Id;
        console.log('Decoded Customer ID:', this.customerid);
      } catch (error) {
        console.error('Error decoding token:', error);
        this.error = 'Invalid token.';
        this.loading = false;
      }
    } else {
      this.error = 'Token not found.';
      this.loading = false;
    }
  }
 ngOnInit() {
  this.loading = true;
  this.decodeCustomerIdFromToken();
  this.loadRentalData();
}

loadRentalData() {
  if (this.customerid) {
    this.rentalService.getRentalBycustomerId(this.customerid).pipe(
      finalize(() => {
        this.loading = false;
      }),
      catchError((error) => {
        console.error('Error fetching rental data:', error);
        this.error = 'Failed to load rental data.';
        return [];
      })
    ).subscribe((rentals) => {
      if (rentals && rentals.length > 0) {
        this.rental = rentals[0];
        this.generateRentalReport(rentals);
      } else {
        this.error = 'No rental data found.';
      }
    });
  } else {
    this.error = 'Customer ID is missing.';
    this.loading = false;
  }
}

generateRentalReport(rentals: Rental[]) {
  const statusCounts: { [key: string]: number } = {
    [RentalStatus.Request]: 0,
    [RentalStatus.Approved]: 0,
    [RentalStatus.Collected]: 0,
    [RentalStatus.Returned]: 0,
    [RentalStatus.Rejected]: 0,
  };

  rentals.forEach((rental) => {
    statusCounts[rental.status] = (statusCounts[rental.status] || 0) + 1;
  });

  this.rentalChartLabels = ['Request', 'Approved', 'Collected', 'Returned', 'Rejected'];

  this.rentalChartData = [
    {
      data: [
        statusCounts[RentalStatus.Request],
        statusCounts[RentalStatus.Approved],
        statusCounts[RentalStatus.Collected],
        statusCounts[RentalStatus.Returned],
        statusCounts[RentalStatus.Rejected],
      ],
      backgroundColor: [
        'rgba(255,99,132,0.6)', // Red for Request
        'rgba(54,162,235,0.6)', // Blue for Approved
        'rgba(255,206,86,0.6)', // Yellow for Collected
        'rgba(75,192,192,0.6)', // Green for Returned
        'rgba(153,102,255,0.6)', // Purple for Rejected
      ],
      label: 'Rentals by Status',
    },
  ];

  this.createChart();
}

createChart() {
  const ctx = document.getElementById('rentalStatusChart') as HTMLCanvasElement;

  if (!ctx) {
    console.error('Chart element not found.');
    return;
  }

  if (this.rentalStatusChart) {
    this.rentalStatusChart.destroy(); // Destroy existing chart to prevent memory leaks
  }

  this.rentalStatusChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: this.rentalChartLabels,
      datasets: this.rentalChartData,
    },
  });
}

}
