import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../../Services/Manager/manager.service';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dvd-details',
  standalone: true,
  imports: [CommonModule,MatProgressSpinnerModule],
  templateUrl: './dvd-details.component.html',
  styleUrl: './dvd-details.component.css'
})
export class DvdDetailsComponent implements OnInit {
  dvd: any = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private dvdService: ManagerService
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');


    if (this.id) {
      this.dvdService.getDvdById(this.id).subscribe(
        (data) => {
          this.dvd = data;
        },
        (error) => {
          console.error('Error fetching DVD details:', error);
        }
      );
    }
  }
}
