import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
  @Input() data!: StatCard;
  protected Math = Math;
}


export interface StatCard {
  title: string;
  value: string | number;
  percentage: number;
  color: string;
}