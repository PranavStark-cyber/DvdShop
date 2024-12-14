import { Component, OnInit } from '@angular/core';
import { Rental, RentalStatus } from '../../modals/customer';
import { RentalService } from '../../../Services/Customer/rental.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any; // Add this to access Bootstrap's popover

@Component({
  selector: 'app-rental-history',
  standalone: true,
  imports: [CommonModule,PopoverModule,FormsModule],
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnInit {
  RentalStatus = RentalStatus;
  selectedTable: RentalStatus = RentalStatus.Request;
  tableData: Rental[] = [];
  customerId: string | null = null;
  selectedDvd: any = null;
  selectedRental: Rental | null = null;

  reviewData = {
    dvdId: '',
    customerId: '',
    comment: '',
    rating: 0,
    reviewDate: ''
  };
  // Chart Data
  public rentalChartData: any[] = [];
  public rentalChartLabels: string[] = [];
  private chart: Chart | null = null;
  modalService: any;

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.decodeCustomerIdFromToken();
    if (this.customerId) {
      this.fetchRentals();
    }
  }

  // Decode customer ID from token
  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.customerId = decodedToken.Id;
    }
  }

  // Fetch rental data from service
  fetchRentals() {
    if (!this.customerId) return;

    this.rentalService.getRentalBycustomerId(this.customerId).subscribe((data) => {
      this.filterDataByStatus(data);
      this.generateRentalReport(data, 'monthly');
    });
  }

  // Filter rentals by status
  filterDataByStatus(rentals: Rental[]) {
    this.tableData = rentals.filter((rental) => rental.status === this.selectedTable);
  }

  // Select table status
  selectTable(status: RentalStatus) {
    this.selectedTable = status;
    this.fetchRentals(); // Fetch rentals when the table status is changed
  }

  // Open review modal for the selected rental
  openReviewModal(content: any, rental: Rental): void {
    this.selectedRental = rental;  // Set the selected rental
    this.reviewData.dvdId = rental.dvd?.id || '';  // Set DVD ID
    this.reviewData.customerId = this.customerId || '';  // Set customer ID from token
    this.reviewData.reviewDate = new Date().toISOString();  // Set current date
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });  // Open modal
  }


  submitReview(): void {
    if (!this.reviewData.comment || this.reviewData.rating === 0) {
      alert("Please fill in the comment and rating.");
      return;
    }

    this.rentalService.addReview(this.reviewData).subscribe(response => {
      console.log('Review submitted successfully', response);
      this.selectedRental = null;  // Reset selected rental
    }, error => {
      console.error('Error submitting review', error);
    });
  }

  // Update the selected DVD for the popover
  updatePopoverData(dvd: any) {
    this.selectedDvd = dvd;
  }
  // Handle report type change (daily, weekly, monthly, yearly)
  onReportTypeChange(event: Event) {
    const reportType = (event.target as HTMLSelectElement).value;
    this.generateRentalReport(this.tableData, reportType);
  }

  // Generate rental report (daily, weekly, monthly, yearly)
  generateRentalReport(rentals: Rental[], reportType: string = 'monthly') {
    const rentalCounts: { [key: string]: number } = {};
    const statusCounts: { [key: string]: number } = {
      [RentalStatus.Request]: 0,
      [RentalStatus.Approved]: 0,
      [RentalStatus.Collected]: 0,
      [RentalStatus.Returned]: 0,
      [RentalStatus.Rejected]: 0,
    };

    rentals.forEach((rental) => {
      const requestDate = new Date(rental.requestDate);
      let period: string;

      // Group by selected report type (daily, weekly, monthly, yearly)
      switch (reportType) {
        case 'daily':
          period = requestDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
          break;
        case 'weekly':
          const startOfWeek = new Date(requestDate);
          startOfWeek.setDate(requestDate.getDate() - requestDate.getDay()); // Get the start of the week
          period = `${startOfWeek.getFullYear()}-${startOfWeek.getMonth() + 1}-${startOfWeek.getDate()}`;
          break;
        case 'yearly':
          period = `${requestDate.getFullYear()}`;
          break;
        case 'monthly':
        default:
          period = `${requestDate.getMonth() + 1}-${requestDate.getFullYear()}`;
          break;
      }

      rentalCounts[period] = (rentalCounts[period] || 0) + 1;
      statusCounts[rental.status]++; // Increment status count
    });

    // Prepare chart data (for rental statuses)
    this.rentalChartLabels = [
      'Request',
      'Approved',
      'Collected',
      'Returned',
      'Rejected',
    ]; // Labels representing rental statuses
    this.rentalChartData = [
      {
        data: [
          statusCounts[RentalStatus.Request],
          statusCounts[RentalStatus.Approved],
          statusCounts[RentalStatus.Collected],
          statusCounts[RentalStatus.Returned],
          statusCounts[RentalStatus.Rejected],
        ], // Data representing the count of each rental status
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

    // Create the chart (Pie chart)
    this.createChart();
  }

  // Create the chart (Pie chart)
  createChart() {
    const ctx = document.getElementById('rentalChart') as HTMLCanvasElement;

    if (ctx) {
      if (this.chart) {
        // Destroy existing chart before creating a new one
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'pie',  // Pie chart for rental status distribution
        data: {
          labels: this.rentalChartLabels,
          datasets: this.rentalChartData,
        },
      });
    }
  }

  // Helper function to map RentalStatus enum to string
  getStatusLabel(status: RentalStatus): string {
    switch (status) {
      case RentalStatus.Request:
        return 'Request';
      case RentalStatus.Approved:
        return 'Approved';
      case RentalStatus.Collected:
        return 'Collected';
      case RentalStatus.Returned:
        return 'Returned';
      case RentalStatus.Rejected:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  // Initialize popover on hover
  initializePopover(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const popover = new bootstrap.Popover(target);
    popover.show();
  }

  // Function to get DVD details
  getDvdDetails(dvd: any) {
    return `Title: ${dvd?.title}<br>Genre: ${dvd?.genre}<br>Release Year: ${dvd?.releaseYear}`;
  }
}
