import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements AfterViewInit {

  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

ngAfterViewInit(): void {
  this.initializeToggle();
}


private initializeToggle(): void {
  const ball = this.el.nativeElement.querySelector('.toggle-ball');
  const items = this.el.nativeElement.querySelectorAll(
    '.container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle'
  );

  this.renderer.listen(ball, 'click', () => {
    items.forEach((item: HTMLElement) => {
      item.classList.toggle('active');
    });
    ball.classList.toggle('active');
  });
}
}
