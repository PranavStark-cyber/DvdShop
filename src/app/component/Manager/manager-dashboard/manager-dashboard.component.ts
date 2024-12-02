import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../dashboard/navbar/navbar.component';
import { SidebarComponent } from '../dashboard/sidebar/sidebar.component';
import { SidebarService } from '../../../Services/Dasboard/sidebar.service';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NavbarComponent,SidebarComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent {
  // isSidebarCollapsed = false;

  // toggleSidebar() {
  //   this.isSidebarCollapsed = !this.isSidebarCollapsed;
  // }

  isCollapsed$: any; 

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    
    this.isCollapsed$ = this.sidebarService.isCollapsed$;
  }
}
