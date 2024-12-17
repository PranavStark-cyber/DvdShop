import { Component } from '@angular/core';
import { ManagerService, watchlists } from '../../../Services/Manager/manager.service';
import { Watchlist } from '../../modals/customer';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: watchlists[] = [];
  customerId!: string

  constructor(private dvdService: ManagerService) { }

  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.customerId = decodedToken.Id;
      console.log('Customer ID:', this.customerId);
    }
    this.loadWatchlist();

  }

  loadWatchlist(): void {
    this.dvdService.getWatchlist(this.customerId).subscribe(
      (response) => {
        this.watchlist = response;
      },
      error => {
        console.error('Error loading watchlist:', error);
      }
    );
  }
}
