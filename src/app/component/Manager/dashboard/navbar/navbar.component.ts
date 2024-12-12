import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../Services/Dasboard/sidebar.service';
import { NotificationService } from '../../../../Services/Dasboard/notification.service';
import { BreadcrumbService } from '../../../../Services/Dasboard/breadcrumb.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';
import { jwtDecode } from 'jwt-decode';
import { Manager } from '../../../modals/customer';
import { ManagerService } from '../../../../Services/Manager/manager.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationPopupComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentBreadcrumb$: any;
  unreadCount$?: any;
  isCollapsed$?: any; // Updated: Deferred initialization
  manager!: Manager;
  managerid!: string;
  error: string | null = null;

  constructor(
    private sidebarService: SidebarService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService,
    private managerservice: ManagerService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.decodeCustomerIdFromToken();
    if (this.managerid) {
      this.loadmanagerData();  // Load data after setting customerId
    }
    // Initialize properties using services
    this.currentBreadcrumb$ = this.breadcrumbService.breadcrumb$;
    this.unreadCount$ = this.notificationService.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.read).length)
    );
    this.isCollapsed$ = this.sidebarService.isCollapsed$; // Moved to ngOnInit
  }

  decodeCustomerIdFromToken() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.managerid = decodedToken.Id;
    }
  }

  loadmanagerData() {

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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    this.router.navigate(['/Dvd/Login'])
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
