import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../Services/Dasboard/sidebar.service';
import { NotificationService } from '../../../../Services/Dasboard/notification.service';
import { BreadcrumbService } from '../../../../Services/Dasboard/breadcrumb.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationPopupComponent } from '../notification-popup/notification-popup.component';

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

  constructor(
    private sidebarService: SidebarService,
    private notificationService: NotificationService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    // Initialize properties using services
    this.currentBreadcrumb$ = this.breadcrumbService.breadcrumb$;
    this.unreadCount$ = this.notificationService.notifications$.pipe(
      map((notifications) => notifications.filter((n) => !n.read).length)
    );
    this.isCollapsed$ = this.sidebarService.isCollapsed$; // Moved to ngOnInit
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
