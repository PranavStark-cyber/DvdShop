export interface User {
    firstName: string;
    lastName: string;
    email: string;
    nic: string;
    password: string;
}

export interface Manager {
  firstName: string;
  lastName: string;
  email: string;
  nic: string;
  password: string;
  Id:string;
}


export interface Login {
    nic: string;
    password: string;
}


export interface Verifyemail {
    email: string;
    otp: number;
}

export interface Director {
    id: number,
    name: string,
    decriptions: number,
}

export interface genres {
    id: number,
    name: string
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
    backgroundImageurl:string;
    trailers:string;
    genre: genres;
    director: Director;
    // rentals: Rental[];    
    // reviews: Review[];    
    inventory?: Inventory; 
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
    backgroundImageurl:string;
    trailers:string;
    totalCopies: number;
}


export interface Customer {
    id: string;
    nic: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    joinDate: string; 
    rentals: Rental[]  | null;  
    payments: Payment[]  | null;
    reviews: Review[]  | null; 
    reservations: Reservation | null;
    notifications: Notification[]  | null; 
    address: Address | null; 
  }
  export interface UpdateCustomer {
    id: string;
    nic: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    address: Address | null; 
  }
  export interface Rental {
    id: string; 
    dvdId: string;
    customerId: string;
    rentalDays: number;
    status: RentalStatus; 
    requestDate: Date;
    approvedDate?: Date; 
    collectedDate?: Date;
    returnDate?: Date;
    dvd?: Dvd; 
    customer?: Customer; 
  }
  
  export enum RentalStatus {
    Request = 0,
    Approved = 1,
    Collected = 2,
    Returned = 3,
    Rejected = 4
  }

  export interface RentalRequestDTO {
    dvdId: string;
    customerId: string;
    rentalDays: number;
    requestDate: string; // Date string in ISO format
    copySofDvd:number;
  }
  
  
  export interface Payment {
    paymentId: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;  // e.g. "Credit Card", "PayPal"
  }
  
  export interface Review {
    reviewId: string;
    rating: number;
    comment: string;
    reviewDate: string;
  }
  
  export interface Reservation {
    reservationId: string;
    reservationDate: string;
    item: string;  // e.g. "DVD", "Book"
  }
  
  export interface Notification {
    notificationId: string;
    message: string;
    date: string;
  }

export interface Address{
    id:string;
    street:string;
    city:string;
    country:string;
}

export interface Inventory{
  id:string;
  dvdId:string;
  totalCopies:number;
  availableCopies:number;
  lastRestock:string;
}