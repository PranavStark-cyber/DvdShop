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
  @Output() themeToggled = new EventEmitter<void>();
  isDarkTheme = true;

  menuItems = [
    { name: 'Home', active: true },
    { name: 'Movies', active: false },
    { name: 'Series', active: false },
    { name: 'Popular', active: false },
    { name: 'Trends', active: false }
  ];

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeToggled.emit();
  }
}
