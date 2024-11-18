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
  movies = [
    {
      title: 'Madagascar 2',
      year: 2008,
      duration: '1h 29min',
      genre: 'Animation',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      imageClass: 'madagascar'
    },
    {
      title: 'Kung Fu Panda 4',
      year: 2024,
      duration: '1h 34min',
      genre: 'Animation',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
      imageClass: 'kungFuPanda'
    },
    {
      title: 'Pink',
      year: 2016,
      duration: '2h 16min',
      genre: 'Bollywood',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      imageClass: 'Pink'
    },
    {
      title: 'Dangal',
      year: 2016,
      duration: '2h 41min',
      genre: 'Bollywood',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      imageClass: 'dangal'
    },
    {
      title: 'G I Joe',
      year: 2009,
      duration: '1h 58min',
      genre: 'Hollywood',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      imageClass: 'gijoe'
    },
    {
      title: 'John Wick 2',
      year: 2017,
      duration: '2h 2min',
      genre: 'Hollywood',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit...',
      imageClass: 'jhonwick'
    },
    {
      title: 'Harry Potter 2',
      year: 2002,
      duration: '2h 38min',
      genre: 'Hollywood',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit...',
      imageClass: 'harrypotter'
    }
  ];
  // changeBackground(background: string): void {
  //   this.selectedBackground = background;
  // }

  // resetBackground(): void {
  //   this.selectedBackground = 'Img/avengers.jpg'; 
  // }
  // ngOnInit(): void {
  //   let index = 0;
  //   this.backgroundInterval = setInterval(() => {
  //     this.selectedBackground = this.trendingMovies[index].background;
  //     index = (index + 1) % this.trendingMovies.length; // Loop through the array
  //   }, 5000); // Change background every 5 seconds
  // }

  // ngOnDestroy(): void {
  //   if (this.backgroundInterval) {
  //     clearInterval(this.backgroundInterval); // Clear interval on component destruction
  //   }
  // }
}
