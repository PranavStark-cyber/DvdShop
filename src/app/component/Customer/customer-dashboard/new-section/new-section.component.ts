import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ManagerService } from '../../../../Services/Manager/manager.service';
import { Dvd } from '../../../modals/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-section',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './new-section.component.html',
  styleUrl: './new-section.component.css'
})
export class NewSectionComponent implements OnInit {
  DVDs: Dvd[] = [];
  dvdsPerRow: number = 10;
  rows: Dvd[][] = []; // Each section will hold one row of DVDs
  @Input() isLatestSection: boolean = false; // Default is false


  constructor(
    private router: Router,
    private dvdservice: ManagerService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDvds(); // Load DVDs when the component initializes
  }

  // Load DVDs from the service
  loadDvds(): void {
    this.dvdservice.GetAllDvds().subscribe(
      (data) => {
        this.DVDs = data;
        console.log(this.DVDs);
        this.splitDvdsIntoRows(); // Split the DVDs into rows of 10
      },
      (error) => {
        this.toster.error('Failed to load DVDs.', 'Error');
        console.error('Error fetching DVDs:', error);
      }
    );
  }

  // Split DVDs into rows of 10
  splitDvdsIntoRows(): void {
    const totalRows = Math.ceil(this.DVDs.length / this.dvdsPerRow);
    for (let i = 0; i < totalRows; i++) {
      this.rows.push(this.DVDs.slice(i * this.dvdsPerRow, (i + 1) * this.dvdsPerRow));
    }
  }

  // Scroll the section left
  scrollLeft(sectionIndex: number): void {
    const scrollContainer = document.querySelector(`#section-${sectionIndex}`) as HTMLElement;
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  }

  // Scroll the section right
  scrollRight(sectionIndex: number): void {
    const scrollContainer = document.querySelector(`#section-${sectionIndex}`) as HTMLElement;
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  }


// app-new-section.component.ts
@Output() movieSelected = new EventEmitter<string>();

onMovieClick(id: string): void {
  this.movieSelected.emit(id);  // Emit the movie ID when clicked
}

}