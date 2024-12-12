import { Component } from '@angular/core';
import { Rental, RentalStatus } from '../../modals/customer';
import { RentalService } from '../../../Services/Customer/rental.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-manager.component.html',
  styleUrl: './rental-manager.component.css'
})
export class RentalManagerComponent {
  rentals: Rental[] = [];
  statusLabels = [
    { label: 'Request', value: RentalStatus.Request },
    { label: 'Approved', value: RentalStatus.Approved },
    { label: 'Collected', value: RentalStatus.Collected },
    { label: 'Returned', value: RentalStatus.Returned },
    { label: 'Rejected', value: RentalStatus.Rejected }
  ];

  constructor(private rentalService: RentalService, private router: Router) {}

  ngOnInit(): void {
    this.rentalService.getAllRentals().subscribe(data => {
      this.rentals = data;
      console.log(this.rentals);
      
    });
  }

  getRentalsByStatus(status: RentalStatus): Rental[] {
    return this.rentals.filter(rental => rental.status === status);
  }

  onCardClick(status: RentalStatus): void {
    this.router.navigate(['/Manager/Rental/', status]);
  }
}
