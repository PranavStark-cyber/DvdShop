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
    { label: 'News', link: '#', active: false },
    { label: 'Video', link: '#', active: false },
    { label: 'Guide', link: '#', active: false },
    { label: 'Games', link: '#', active: false }
  ];
}
