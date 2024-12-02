import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../Services/Dasboard/notification.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-popup.component.html',
  styleUrl: './notification-popup.component.css'
})
export class NotificationPopupComponent implements OnInit {
  notifications$!: Observable<any>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // Initialize notifications$ here after service is injected
    this.notifications$ = this.notificationService.notifications$;
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id);
  }
}
