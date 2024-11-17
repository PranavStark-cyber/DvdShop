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
  items = [
    { 
      image: 'Img/avengers.jpg', 
      author: 'LUNDEV', 
      title: 'DESIGN SLIDER', 
      topic: 'ANIMAL', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
    },
    { 
      image: 'Img/movie-collection.jpg', 
      author: 'LUNDEV', 
      title: 'DESIGN SLIDER', 
      topic: 'ANIMAL', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
    },
    { 
      image: 'Img/avengers.jpg', 
      author: 'LUNDEV', 
      title: 'DESIGN SLIDER', 
      topic: 'ANIMAL', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
    },
    { 
      image: 'Img/movie-collection.jpg', 
      author: 'LUNDEV', 
      title: 'DESIGN SLIDER', 
      topic: 'ANIMAL', 
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' 
    }
  ];

  currentIndex = 0;
  timeRunning = 3000;
  timeAutoNext = 7000;
  timeWidth = 100;

  ngOnInit(): void {
    this.startAutoRotation();
  }

  nextSlider() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.resetTimer();
  }

  prevSlider() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.resetTimer();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetTimer();
  }

  resetTimer() {
    clearTimeout(this.timeRunning);
    this.startAutoRotation();
  }

  startAutoRotation() {
    setTimeout(() => {
      this.nextSlider();
    }, this.timeAutoNext);
  }

  seeMore(item: any) {
    console.log(`See more about: ${item.title}`);
  }

  subscribe(item: any) {
    console.log(`Subscribed to: ${item.title}`);
  }

  updateTimer() {
    this.timeWidth = (100 / this.timeAutoNext) * this.timeRunning;
  }
}
