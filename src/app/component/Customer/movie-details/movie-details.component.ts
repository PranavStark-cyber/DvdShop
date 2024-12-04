import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewSectionComponent } from '../customer-dashboard/new-section/new-section.component';
import { Dvd } from '../../modals/customer';
import { ManagerService } from '../../../Services/Manager/manager.service';


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,NewSectionComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent  {
  dvd!: Dvd; // The DVD data to show in the hero section
  // defaultDvd = { // Default data for the hero section
  //   Title: 'Default Movie',
  //   Genre: 'Default Genre',
  //   Director: 'Default Director',
  //   ReleaseDate: new Date(),
  //   Price: 0,
  //   BackgroundUrl: 'default-image.jpg'
  // };



  constructor(private router: Router, private dvdService: ManagerService) {}

  ngOnInit(): void {
    const id = history.state.id;
    if (id) {
      this.fetchDvdById(id);
    }
  }

  fetchDvdById(id: string): void {
    this.dvdService.getDvdById(id).subscribe({
      next: (data) => {
        this.dvd = data;
      },
      error: (err) => {
        console.error('Error fetching DVD:', err);
      }
    });
  }

 // Handle movie selection and navigate to the selected movie page
 onMovieSelected(id: string): void {
  // Navigate to the movie details page and pass the ID as navigation state
  this.router.navigate(['/Customer/Movie'], { state: { id: id } });

  // Update the hero section with the selected movie's details
  this.fetchDvdById(id);
}
}

