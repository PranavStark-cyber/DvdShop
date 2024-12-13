import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StatCard, StatCardComponent } from './stat-card/stat-card.component';
import { ChartCardComponent } from './chart-card/chart-card.component';



@Component({
  selector: 'app-dashboard-details',
  standalone: true,
  imports: [CommonModule,StatCardComponent,ChartCardComponent],
  templateUrl: './dashboard-details.component.html',
  styleUrl: './dashboard-details.component.css'
})
export class DashboardDetailsComponent {
  statCards: StatCard[] = [
    { title: 'Total Dvds', value: '125', percentage: 24.7, color: 'primary' },
    { title: 'Available Dvds', value: '213', percentage: 5.28, color: 'info' },
    { title: 'Renatls', value: '10,225', percentage: 16, color: 'success' },
    { title: 'Earning', value: '$2,658', percentage: 5.07, color: 'warning' },
  ];

  productsChartData = {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      datasets: [{
        label: 'Products',
        data: [440, 510, 410, 677, 230, 410, 510, 420],
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

  profitChartData = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Profit',
        data: [30, 40, 50, 45, 40, 110, 100],
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


