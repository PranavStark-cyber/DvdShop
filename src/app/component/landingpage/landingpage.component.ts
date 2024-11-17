import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

  selectedBackground = 'Img/avengers.jpg'; 
  backgroundInterval: any;
  trendingMovies = [
    {
      title: 'The Covenant',
      image: 'Img/movie/movie 10.png',
      background: 'Img/Strangerthings.png'
    },
    {
      title: '65',
      image: 'Img/movie/movie 11.png',
      background: 'Img/wenesday.jpg'
    },
    {
      title: 'The Black Demon',
      image: 'Img/movie/movie 12.png',
      background: 'Img/StrabgerThing.jpg'
    },
    {
      title: 'The Tank',
      image: 'Img/movie/movie 13.png',
      background: 'Img/Kanguva.jpg'
    }
  ];
  changeBackground(background: string): void {
    this.selectedBackground = background;
  }

  resetBackground(): void {
    this.selectedBackground = 'Img/avengers.jpg'; 
  }
  ngOnInit(): void {
    let index = 0;
    this.backgroundInterval = setInterval(() => {
      this.selectedBackground = this.trendingMovies[index].background;
      index = (index + 1) % this.trendingMovies.length; // Loop through the array
    }, 5000); // Change background every 5 seconds
  }

  ngOnDestroy(): void {
    if (this.backgroundInterval) {
      clearInterval(this.backgroundInterval); // Clear interval on component destruction
    }
  }
}
