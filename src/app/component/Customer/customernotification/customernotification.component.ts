import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../Services/Customer/notification.service';
import { jwtDecode } from 'jwt-decode';
import { CustomerNotifications } from '../../modals/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customernotification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customernotification.component.html',
  styleUrl: './customernotification.component.css'
})
export class CustomernotificationComponent {
  notifications: CustomerNotifications[] = [];
  customerId!:string
  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
     const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
          const decodedToken: any = jwtDecode(jwtToken);
          this.customerId = decodedToken.Id;
        }
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationService.GetNotficationById(this.customerId).subscribe((data: CustomerNotifications[]) => {
      this.notifications = data;
    });
  }

  deleteNotification(id: string): void {
    this.notificationService.deleteNotification(id).subscribe(() => {
      // Remove the deleted notification from the array
      this.notifications = this.notifications.filter(notification => notification.id !== id);
      // Show success toast
      this.toastr.success('Notification deleted successfully!', 'Success');
    }, (error) => {
      // Show error toast if something goes wrong
      this.toastr.error('Failed to delete notification!', 'Error');
    });
  }
}
