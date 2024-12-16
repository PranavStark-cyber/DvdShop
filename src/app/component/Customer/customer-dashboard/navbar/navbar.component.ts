import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../../../Services/Customer/customer.service';
import { jwtDecode } from 'jwt-decode';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { Customer, CustomerNotifications } from '../../../modals/customer';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../../Services/Customer/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, PopoverModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  navItems = [
    { label: 'Home', link: '/Customer/Home', active: false },
    { label: 'Movies', link: '/Customer/Movie', active: false },
    { label: 'Series', link: '#', active: false },
    { label: 'Anime', link: '#', active: false },
    { label: 'Rental', link: '/Customer/RentalHistory', active: false }
  ];
  isSearchHovered = false;
  isOpen = false;
  userData!: Customer
  customerId!: string
  constructor(private customerservice: CustomerService, private router: Router,private notificationService: NotificationService) { }
  ngOnInit(): void {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);
      this.customerId = decodedToken.Id;
    }
    this.getcustomerdata()
  }


  getcustomerdata() {
    this.customerservice.GetCustomerbyId(this.customerId).subscribe((data) => {
      this.userData = data

      console.log(this.userData);

    })
  }
  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    this.router.navigate(['/Dvd/Login'])
  }

  Profile(id:string): void {
   this.router.navigate(['/Customer/Profile/']);
   this.isOpen = false;
  }

  notifications: CustomerNotifications[] = [];
  hoveredNotification: CustomerNotifications | null = null;
  popupPosition = { left: 0, top: 0 };


  fetchNotifications(): void {
    this.notificationService.GetNotficationById(this.customerId).subscribe((data: CustomerNotifications[]) => {
      this.notifications = data;
    });
  }

  showDetails(notification: CustomerNotifications, event: MouseEvent): void {
    this.hoveredNotification = notification;
    this.popupPosition = { left: event.pageX + 10, top: event.pageY + 10 };
  }

  hideDetails(): void {
    this.hoveredNotification = null;
  }

}
