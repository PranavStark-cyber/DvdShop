import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataServiceService {

  constructor() { }

  // Method to generate random data for the chart
  generateChartData(count: number, min: number, max: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return result;
  }

  // Utility object for colors
  getChartColors(): { [key: string]: string } {
    return {
      red: '#FF5733',
      orange: '#FFA500',
      yellow: '#FFFF00',
      green: '#4CAF50',
      blue: '#2196F3'
    };
  }

  // Generate complete chart data, including labels and datasets
  getChartData(): { labels: string[], datasets: { label: string, data: number[], backgroundColor: string[] }[] } {
    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
    const colors = this.getChartColors();

    return {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          label: 'Dataset 1',
          data: this.generateChartData(NUMBER_CFG.count, NUMBER_CFG.min, NUMBER_CFG.max),
          backgroundColor: Object.values(colors),
        }
      ]
    };
  }
}
