import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import { TruncatePipe } from '../../../pipe/truncate.pipe';
import { SlideTransformPipe } from '../../../pipe/slide-transform-pipe.pipe';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule,TruncatePipe,SlideTransformPipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

  constructor(private rout:Router){}

  DVDs = [
    {
      "Id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      "Title": "Kanguva",
      "Genre": "Action",
      "Director": "Siva",
      "ReleaseDate": "2024-07-20T00:00:00",
      "Price": 19.99,
      "Description": "A fierce warrior embarks on a mission to defeat an ancient evil that threatens the survival of his kingdom.",
      "ImageUrl": "/movie/movie 35.jpg",
      "BackgroundUrl": "/Background image/Kanguva backgground.png"
    },
    {
      "Id": "2a3b4c5d-6e7f-8g9h-0i1j-2k3l4m5n6o7p",
      "Title": "Avengers: Infinity War",
      "Genre": "Action",
      "Director": "Anthony Russo, Joe Russo",
      "ReleaseDate": "2018-04-27T00:00:00",
      "Price": 14.99,
      "Description": "The Avengers must fight Thanos, a powerful villain who seeks to control the universe by collecting all the Infinity Stones.",
      "ImageUrl": "/movie/movie 34.jpg",
      "BackgroundUrl": "/Background image/Avengers background.jpg"
    },
    {
      "Id": "3b4c5d6e-7f8g-9h0i-1j2k-3l4m5n6o7p8q",
      "Title": "Stranger Things",
      "Genre": "Horror",
      "Director": "The Duffer Brothers",
      "ReleaseDate": "2016-07-15T00:00:00",
      "Price": 12.99,
      "Description": "A group of kids uncover a dark and dangerous secret in their small town, leading them to face supernatural forces.",
      "ImageUrl": "/movie/movie 5.jpg",
      "BackgroundUrl": "/Background image/stranger thongs full.jpg"
    },
    {
      "Id": "4c5d6e7f-8g9h-0i1j-2k3l-4m5n6o7p8q9r",
      "Title": "Wednesday",
      "Genre": "Mystery",
      "Director": "Tim Burton",
      "ReleaseDate": "2022-11-23T00:00:00",
      "Price": 13.99,
      "Description": "The daughter of the Addams Family, Wednesday Addams, embarks on a new adventure at Nevermore Academy, solving mysteries and discovering secrets.",
      "ImageUrl": "/movie/movie 27.jpg",
      "BackgroundUrl": "/Background image/Wenesday1.jpg"
    },
    {
      "Id": "5d6e7f8g-9h0i-1j2k-3l4m-5n6o7p8q9r0s",
      "Title": "The Batman",
      "Genre": "Action",
      "Director": "Matt Reeves",
      "ReleaseDate": "2022-03-04T00:00:00",
      "Price": 15.99,
      "Description": "Bruce Wayne becomes the vigilante known as Batman, trying to stop a masked serial killer while uncovering corruption within Gotham City.",
      "ImageUrl": "/movie/movie 10.png",
      "BackgroundUrl": "/Background image/The Batman.jpg"
    },
    {
      "Id": "6e7f8g9h-0i1j-2k3l-4m5n-6o7p8q9r0s1t",
      "Title": "Mufasa: The Lion King",
      "Genre": "Animation",
      "Director": "Barry Jenkins",
      "ReleaseDate": "2024-07-25T00:00:00",
      "Price": 18.99,
      "Description": "A prequel to The Lion King, Mufasa's story is told as he rises to become king of the Pride Lands.",
      "ImageUrl": "/movie/movie 14.jpg",
      "BackgroundUrl": "/Background image/Mufasa.jpg"
    }
  ];

  cardWidth = 340; 
  visibleCards = Math.floor(window.innerWidth / this.cardWidth);


  sections = [
    { currentIndex: 0, direction: 'right' as 'left' | 'right' },
    { currentIndex: 0, direction: 'right' as 'left' | 'right' },
  ];

  slide(sectionIndex: number, direction: 'left' | 'right') {
    const section = this.sections[sectionIndex]; 
    const totalCards = this.DVDs.length;
    const visibleCards = this.visibleCards;
  
    section.direction = direction;
  
    if (direction === 'right') {
      if (section.currentIndex < totalCards - visibleCards) {
        section.currentIndex++;
      } else {
        section.currentIndex = 0; 
      }
    } else if (direction === 'left') {
      if (section.currentIndex > 0) {
        section.currentIndex--;
      } else {
        section.currentIndex = totalCards - visibleCards; 
      }
    }
  }
  

  @HostListener('window:resize')
  onResize() {
    this.visibleCards = Math.floor(window.innerWidth / this.cardWidth);
  }
  public selectedDVD:any = null;

  @Output() Dvd = new EventEmitter();

  AddProduct(Dvd:any){
    this.Dvd.emit(Dvd)
  }

  gotoDetails(id:string){
    this.rout.navigate(['/Customer/Moviedetails' , id])
  }

}
