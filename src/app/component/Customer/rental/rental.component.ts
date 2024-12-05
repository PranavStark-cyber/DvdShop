import { Component } from '@angular/core';
import { Dvd, RentalRequestDTO } from '../../modals/customer';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../../../Services/Customer/rental.service';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
    dvd!: Dvd;
    customerId: string = '';
    copiesOfDvd: number = 1;
    rentalDays: number = 1; // Default to 1 day
  
    constructor(
      private route: ActivatedRoute,
      private dvdService: ManagerService,
      private rentalService: RentalService
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
        console.error('Customer ID is missing');
        return;
      }
  
      const rentalRequest: RentalRequestDTO = {
        dvdId: this.dvd.id,
        customerId: this.customerId,
        rentalDays: this.rentalDays, // Pass the selected rental days
        requestDate: new Date().toISOString(),
        copySofDvd: this.copiesOfDvd
      };
      console.log(rentalRequest);
      
 
      this.rentalService.RequestRental(rentalRequest).subscribe(
        (response) => {
          console.log('Rental request successful:', response);
        },
        (error) => {
          console.error('Error sending rental request:', error);
        }
      );
    }
  }
