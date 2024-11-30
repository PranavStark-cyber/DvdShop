import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
dvds: any;

}
