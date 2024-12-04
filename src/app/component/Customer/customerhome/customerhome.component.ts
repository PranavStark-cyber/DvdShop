import { Component } from '@angular/core';
import { NewSectionComponent } from '../customer-dashboard/new-section/new-section.component';
import { NewDvdDealsComponent } from '../customer-dashboard/new-dvd-deals/new-dvd-deals.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { Router } from '@angular/router';
import { ManagerService } from '../../../Services/Manager/manager.service';

@Component({
  selector: 'app-customerhome',
  standalone: true,
  imports: [NewSectionComponent,NewDvdDealsComponent,MovieListComponent],
  templateUrl: './customerhome.component.html',
  styleUrl: './customerhome.component.css'
})
export class CustomerhomeComponent {

  
  constructor(private router: Router, private dvdService: ManagerService) {}
   // Handle movie selection and navigate to the selected movie page
 onMovieSelected(id: string): void {
  // Navigate to the movie details page and pass the ID as navigation state
  this.router.navigate(['/Customer/Movie'], { state: { id: id } });

  // Update the hero section with the selected movie's details
}

}
