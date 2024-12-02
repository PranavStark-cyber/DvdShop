export interface User {
    firstName: string;
    lastName: string;
    email: string;
    nic: string;
    password: string;
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


export interface Customer {
    id: string;
    nic: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    joinDate: string; 
    rentals: Rental[];  // You can include rental details like movie name, rental date, etc.
    payments: Payment[]; // Include details like payment date, amount, status
    reviews: Review[];   // Include review ratings, comments, etc.
    reservations: Reservation | null; // If the customer has any active reservations
    notifications: Notification[]; // Notifications for the customer
    address: Address; // Include full address details
  }

  export interface Rental {
    rentalId: string;
    rentalDate: string;
    rentalItem: string;  // e.g. "DVD", "Book"
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