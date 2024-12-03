import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navItems = [
    { label: 'Home', link: '#', active: true },
    { label: 'Movies', link: '#', active: false },
    { label: 'Series', link: '#', active: false },
    { label: 'Anime', link: '#', active: false },
    { label: 'Rental', link: '#', active: false }
  ];
  isSearchHovered = false;
}
