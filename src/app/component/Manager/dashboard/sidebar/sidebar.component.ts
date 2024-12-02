import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../../../Services/Dasboard/sidebar.service';
import { BreadcrumbService } from '../../../../Services/Dasboard/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MenuItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Fixed styleUrls typo
})
export class SidebarComponent implements OnInit {
  isCollapsed$: any; // Declare the variable without initializing it
  isMobile = false;

  menuItems: MenuItem[] = [
    { path: '/Manager/DashBoard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/employees', icon: 'bi-people', label: 'Employees' },
    { path: '/projects', icon: 'bi-folder', label: 'Projects' },
    { path: '/attendance', icon: 'bi-clock-history', label: 'Attendance' },
    { path: '/clients', icon: 'bi-person-badge', label: 'Clients' },
    { path: '/leave-management', icon: 'bi-calendar-check', label: 'Leave Management' },
    { path: '/holidays', icon: 'bi-calendar-event', label: 'Holidays' },
    { path: '/accounts', icon: 'bi-wallet2', label: 'Accounts' },
  ];

  constructor(
    private sidebarService: SidebarService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    // Initialize properties in ngOnInit after services are injected
    this.isCollapsed$ = this.sidebarService.isCollapsed$;
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.sidebarService.collapse(true);
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  updateBreadcrumb(label: string) {
    this.breadcrumbService.setBreadcrumb(label);
    if (this.isMobile) {
      this.sidebarService.collapse(true);
    }
  }
}
