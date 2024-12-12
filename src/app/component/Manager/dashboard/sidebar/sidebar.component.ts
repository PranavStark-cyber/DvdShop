import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../../../Services/Dasboard/sidebar.service';
import { BreadcrumbService } from '../../../../Services/Dasboard/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Manager } from '../../../modals/customer';
import { jwtDecode } from 'jwt-decode';
import { ManagerService } from '../../../../Services/Manager/manager.service';

interface MenuItem {
  path: string;
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // Fixed styleUrls typo
})
export class SidebarComponent implements OnInit {
  isCollapsed$: any; // Declare the variable without initializing it
  isMobile = false;
  manager!: Manager;
  managerid!:string;
  error: string | null = null;

  menuItems: MenuItem[] = [
    { path: '/Manager/DashBoard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/Manager/Dvd', icon: 'bi-people', label: 'Dvd' },
    { path: '/Manager/Customer', icon: 'bi-folder', label: 'Customer' },
    { path: '/Manager/Rental', icon: 'bi-clock-history', label: 'Rental' },
    { path: '/some', icon: 'bi-person-badge', label: 'Clients' },
    { path: '/leave-management', icon: 'bi-calendar-check', label: 'Leave Management' },
    { path: '/holidays', icon: 'bi-calendar-event', label: 'Holidays' },
    { path: '/accounts', icon: 'bi-wallet2', label: 'Accounts' },
  ];

  constructor(
    private sidebarService: SidebarService,
    private breadcrumbService: BreadcrumbService,
    private managerservice: ManagerService
  ) {}

  ngOnInit() {

    this.decodeCustomerIdFromToken();
    if (this.managerid) {
      this.loadmanagerData(this.managerid);  // Load data after setting customerId
    }
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
  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.managerid = decodedToken.Id;
    }
  }

  loadmanagerData(managerid:string){

      if (!this.managerid) return;
  
      this.managerservice.GetManagerbyId(this.managerid).subscribe(
        (data) => {
          this.manager = data;
          // this.loading = false
        },
        (error) => {
          this.error = "Failed to load data. Please try again later.";
        }
      );
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
