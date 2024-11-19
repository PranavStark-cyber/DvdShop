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

  DVDs =[
    {
      "Id": "3d6fa3c5-4d54-42f7-9e3d-1d7f7e6f6b12",
      "Title": "Inception",
      "Genre": "Science Fiction",
      "Director": "Christopher Nolan",
      "ReleaseDate": "2010-07-16T00:00:00",
      "Price": 12.99,
      "Description": "A skilled thief is given a chance at redemption if he can successfully plant an idea in someone's mind.",
      "ImageUrl": "/Background image/Kanguva (1).jpg",
      "BackgroundUrl": "/Background image/Mufasa.jpg"
    },
    {
      "Id": "914b0e67-7a71-4539-bd6e-0bb0f3df0d9a",
      "Title": "The Dark Knight",
      "Genre": "Action",
      "Director": "Christopher Nolan",
      "ReleaseDate": "2008-07-18T00:00:00",
      "Price": 14.99,
      "Description": "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
      "ImageUrl": "/Background image/Mufasa.jpg",
      "BackgroundUrl": "/Background image/Kanguva (1).jpg"
    },
    {
      "Id": "ed0a6a9e-63a7-4a3f-b52f-7e7d7e2b82b3",
      "Title": "Interstellar",
      "Genre": "Adventure",
      "Director": "Christopher Nolan",
      "ReleaseDate": "2014-11-07T00:00:00",
      "Price": 15.99,
      "Description": "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
      "ImageUrl": "/Background image/StrabgerThing.jpg"
    },
    {
      "Id": "abc12345-6789-4abc-def0-1234567890ab",
      "Title": "The Matrix",
      "Genre": "Science Fiction",
      "Director": "The Wachowskis",
      "ReleaseDate": "1999-03-31T00:00:00",
      "Price": 11.99,
      "Description": "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
      "ImageUrl": "/Background image/wenesday.jpg"
    },
    {
      "Id": "456def78-9abc-4def-0123-456789abcdef",
      "Title": "The Shawshank Redemption",
      "Genre": "Drama",
      "Director": "Frank Darabont",
      "ReleaseDate": "1994-09-22T00:00:00",
      "Price": 9.99,
      "Description": "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of decency.",
      "ImageUrl": "/Background image/The Batman.jpg"
    },
    {
      "Id": "789abc12-3def-4567-890a-bcdef0123456",
      "Title": "The Godfather",
      "Genre": "Crime",
      "Director": "Francis Ford Coppola",
      "ReleaseDate": "1972-03-24T00:00:00",
      "Price": 13.99,
      "Description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      "ImageUrl": "/Background image/Uncharted.jpg"
    }
  ]

  currentIndex = 0;

  ngOnInit(): void {}

  moveSlider(direction: 'next' | 'prev'): void {
    if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.DVDs.length;
    } else {
      this.currentIndex = this.currentIndex === 0 ? this.DVDs.length - 1 : this.currentIndex - 1;
    }
  }
  // selectedDVD: DVD | null = null;

  // selectDVD(dvd: DVD): void {
  //   this.selectedDVD = dvd;
  // }
  
}

// export interface DVD {
//   Id: string;
//   Title: string;
//   Genre: string;
//   Director: string;
//   ReleaseDate: string;
//   Price: number;
//   Description: string;
//   ImageUrl: string;
// }

export interface DVD {
  Id: string;
  Title: string;
  Genre: string;
  Director: string;
  ReleaseDate: string;
  Price: number;
  Description: string;
  ImageUrl: string;
  BackgroundUrl: string;


}




// $(document).ready(function(){
//   $('.carousel').carousel();
// });

// const changeBgImg = (bgImgUrl, title) => {
//   const banner = document.querySelector('.banner')
//   const contents = document.querySelectorAll('.content')

//   banner.style.background = `url(./image/landscape/${bgImgUrl})`
//   banner.style.backgroundPosition = 'center'

//   contents.forEach(content => {
//       content.classList.remove('active')
//       if(content.classList.contains(title)){
//           content.classList.add('active')
//       }
//   })
// }

// const toggleVideo = () => {
//   const trailer = document.querySelector('.trailer')
//   const video = document.querySelector('video')
//   video.pause()
//   trailer.classList.toggle('active')
// }