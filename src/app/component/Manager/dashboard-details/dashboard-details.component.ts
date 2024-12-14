import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatCard, StatCardComponent } from './stat-card/stat-card.component';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { RentalService } from '../../../Services/Customer/rental.service';
import { Rental, RentalStatus } from '../../modals/customer';



@Component({
  selector: 'app-dashboard-details',
  standalone: true,
  imports: [CommonModule, StatCardComponent, ChartCardComponent],
  templateUrl: './dashboard-details.component.html',
  styleUrl: './dashboard-details.component.css'
})
export class DashboardDetailsComponent {
  statCards: StatCard[] = [
    { title: 'Total DVDs', value: 0, percentage: 0, color: 'primary' },
    { title: 'Available DVDs', value: 0, percentage: 0, color: 'info' },
    { title: 'Rentals', value: 0, percentage: 0, color: 'success' },
    { title: 'Earnings', value: '$0', percentage: 0, color: 'warning' },
  ];

  constructor(
    private managerService: ManagerService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadStatData();
    this.loadRentalData();
  }

  loadStatData(): void {
    // Fetch Total DVDs
    this.managerService.getAllInventory().subscribe(data => {
      this.statCards[0].value = data.totalDvdCount;
      this.statCards[0].percentage = ((Number(this.statCards[0].value) / 1000) * 100) - 100;// Example logic for percentage
    });

    // Fetch Available DVDs
    this.managerService.getAllInventory().subscribe(data => {
      // Ensure both values are treated as numbers
      this.statCards[1].value = Number(data.availableDvdCount); // Convert to number if not already
      this.statCards[0].value = Number(this.statCards[0].value); // Ensure statCards[0].value is a number

      // Now perform the percentage calculation
      this.statCards[1].percentage = ((this.statCards[1].value / this.statCards[0].value) * 100) - 100;
    });

    // Fetch Total Rentals
    this.rentalService.getAllRentals().subscribe(data => {
      this.statCards[2].value = data.length;
      this.statCards[2].percentage = (data.length / 100) - 100; // Example logic for percentage
    });

    // Fetch Total Earnings
    this.managerService.getTotalEarnings().subscribe(data => {
      this.statCards[3].value = data.totalEarnings;
      this.statCards[3].percentage = (data.totalEarnings / 1000) - 100; // Example logic for percentage
    });
  }

 // Initialize chart data
 productsChartData = {
  type: 'bar',
  data: {
    labels: ['Request', 'Approved', 'Collected', 'Returned', 'Rejected'],  // Rental statuses as labels
    datasets: [{
      label: 'Rentals',
      data: [0, 0, 0, 0, 0],  // Initialize all counts as 0
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
};
loadRentalData(): void {
  // Fetch rental data from backend
  this.rentalService.getAllRentals().subscribe(data => {
    // Initialize counters for each status
    const rentalStatusCount = {
      [RentalStatus.Request]: 0,
      [RentalStatus.Approved]: 0,
      [RentalStatus.Collected]: 0,
      [RentalStatus.Returned]: 0,
      [RentalStatus.Rejected]: 0
    };

    const rentalOverdueAmount = {
      [RentalStatus.Request]: 0,
      [RentalStatus.Approved]: 0,
      [RentalStatus.Collected]: 0,
      [RentalStatus.Returned]: 0,
      [RentalStatus.Rejected]: 0
    };

    // Loop through the rental data to count statuses and calculate overdue amounts
    data.forEach((rental: Rental) => {
      rentalStatusCount[rental.status]++;

      // If status is collected, returned, or overdue, add overdue amount
      if (rental.status === RentalStatus.Collected || rental.status === RentalStatus.Returned) {
        rentalOverdueAmount[rental.status] += rental.overdueAmount;
      }
    });

    // Update bar chart data for rental counts
    this.productsChartData.data.datasets[0].data = [
      rentalStatusCount[RentalStatus.Request],
      rentalStatusCount[RentalStatus.Approved],
      rentalStatusCount[RentalStatus.Collected],
      rentalStatusCount[RentalStatus.Returned],
      rentalStatusCount[RentalStatus.Rejected]
    ];

    // Update line chart data for overdue amounts
    this.profitChartData.data.datasets[0].data = [
      rentalOverdueAmount[RentalStatus.Request],
      rentalOverdueAmount[RentalStatus.Approved],
      rentalOverdueAmount[RentalStatus.Collected],
      rentalOverdueAmount[RentalStatus.Returned],
      rentalOverdueAmount[RentalStatus.Rejected]
    ];
  });
}

profitChartData = {
  type: 'line',
  data: {
    labels: ['Request', 'Approved', 'Collected', 'Returned', 'Rejected'], // Rental statuses as labels
    datasets: [{
      label: 'Overdue Amount',
      data: [0, 0, 0, 0, 0],  // Initialize all overdue amounts as 0
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      tension: 0.4
    }]
  },
  options: {
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  }
};
}


