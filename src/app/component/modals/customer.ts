export interface User{
    firstName:string;
    lastName:string;
    email:string;
    nic:string;
    password:string;
}

export interface Login{
    nic:string;
    password:string;
}


export interface Verifyemail{
    email:string;
    otp:number;   
}

export interface Director{
    id:number,
    name:string,
    decriptions:number,
}

export interface genres{
    id:number,
    name:string
}

export interface Dvd {
    id: string;          
    title: string;
    genreId: number;
    directorId: number;
    releaseDate: string;  
    price: number;
    description: string;
    imageUrl: string;
    genre: genres;         
    director: Director; 
    // rentals: Rental[];    
    // reviews: Review[];    
    // inventory: Inventory; 
    // reservations: Reservation[]; 
  }

  export interface DvdRequest {        
    title: string;
    genreId?: number;
    genreName?: string;
    directorId?: number;
    directorName?: string;
    directorDescription?: string;
    releaseDate: string;  
    price: number;
    description: string;
    imageUrl: string;
    totalCopies: number;
  }
  