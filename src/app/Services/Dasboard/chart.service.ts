import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);
@Injectable({
  providedIn: 'root'
})
export class ChartService {

  createChart(ctx: CanvasRenderingContext2D, config: any): Chart {
    return new Chart(ctx, {
      ...config,
      options: {
        ...config.options,
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
