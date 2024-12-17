import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NewSectionComponent } from '../customer-dashboard/new-section/new-section.component';
import { Dvd } from '../../modals/customer';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare global {
  interface Window {
    bootstrap: any;
  }
}


@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,NewSectionComponent,RouterLink],
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

  

  trailerUrl: SafeResourceUrl | null = null;
  isModalVisible: boolean = false;

  constructor(private router: Router, private dvdService: ManagerService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const id = history.state.id;
    if (id) {
      this.fetchDvdById(id);
    }

    if (this.dvd?.trailers) {
      // Sanitize the URL using DomSanitizer
      this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dvd.trailers);
    }
  }
  showTrailer() {
    const trailerModal = new window.bootstrap.Modal(
      document.getElementById('trailerModal') as HTMLElement
    );
    trailerModal.show();
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

