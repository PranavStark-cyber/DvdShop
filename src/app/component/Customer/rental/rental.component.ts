import { Component } from '@angular/core';
import { Dvd, RentalRequestDTO } from '../../modals/customer';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../../Services/Customer/rental.service';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSnackBarModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
    dvd!: Dvd;
    customerId: string = '';
    copiesOfDvd: number = 1;
    rentalDays: number = 1; // Default to 1 day
    successMessage: string = '';
    errorMessage: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private dvdService: ManagerService,
      private rentalService: RentalService,
      private snackBar: MatSnackBar
    ) {}
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.dvdService.getDvdById(id).subscribe(
          (data: Dvd) => {
            this.dvd = data;
            console.log('DVD data:', this.dvd);
          },
          (error) => {
            console.error('Error fetching DVD data:', error);
          }
        );
      }
  
      const jwtToken = localStorage.getItem('token');
      if (jwtToken) {
        const decodedToken: any = jwtDecode(jwtToken);
        this.customerId = decodedToken.Id;
        console.log('Customer ID:', this.customerId);
      }
    }
  
    rentDvd(): void {
      if (!this.customerId) {
        this.snackBar.open('Customer ID is missing.', 'Close', {
          duration: 3000,
          panelClass: ['mat-snack-bar-error'],
        });
        return;
      }
  
      const rentalRequest: RentalRequestDTO = {
        dvdId: this.dvd.id,
        customerId: this.customerId,
        rentalDays: this.rentalDays,
        requestDate: new Date().toISOString(),
        copySofDvd: this.copiesOfDvd
      };
  
      this.rentalService.RequestRental(rentalRequest).subscribe(
        (response) => {
          this.snackBar.open('Rental request successful! Your DVD is on the way.', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-success'],
          });
        },
        (error) => {
          this.snackBar.open('Error sending rental request. Please try again later.', 'Close', {
            duration: 3000,
            panelClass: ['mat-snack-bar-error'],
          });
        }
      );
    }
  }
