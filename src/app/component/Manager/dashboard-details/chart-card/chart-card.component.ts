import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../../../../Services/Dasboard/chart.service';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.css'
})
export class ChartCardComponent implements AfterViewInit {

  @Input() title!: string;
  @Input() data!: any;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart?: Chart;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    this.createChart();
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = this.chartService.createChart(ctx, this.data);
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
