import { Component, Input } from '@angular/core';
import { RentalService } from '../../../Services/Customer/rental.service';
import { Rental, RentalRespons, RentalStatus } from '../../modals/customer';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental-table.component.html',
  styleUrl: './rental-table.component.css'
})
export class RentalTableComponent {
  @Input() rentals: RentalRespons[] = [];
  status: RentalStatus | null = null;
  RentalStatus = RentalStatus; // Pass RentalStatus to the template

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const statusParam = this.route.snapshot.paramMap.get('status');
    this.status = statusParam ? parseInt(statusParam) as RentalStatus : null;

    if (this.status !== null) {
      this.rentalService.getAllRental().subscribe(data => {
        this.rentals = data.filter(rental => rental.status === this.status);
        
      });
    }
  }

  onApprove(rentalId: string): void {
    this.rentalService.ApproveRental(rentalId).subscribe(() => {
      this.rentals = this.rentals.filter(rental => rental.rentalId !== rentalId);
    });
  }

  onReject(rentalId: string): void {
    this.rentalService.RejectRental(rentalId).subscribe(() => {
      this.rentals = this.rentals.filter(rental => rental.rentalId !== rentalId);
    });
  }

  onCollect(rentalId: string): void {
    this.rentalService.CollectedRental(rentalId).subscribe(() => {
      this.rentals = this.rentals.filter(rental => rental.rentalId !== rentalId);
  
      
    });
  }

  onReturn(rentalId: string): void {
    this.rentalService.ReturnRental(rentalId).subscribe(() => {
      this.rentals = this.rentals.filter(rental => rental.rentalId !== rentalId);
    });
  }
}
