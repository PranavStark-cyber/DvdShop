import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental, RentalRequestDTO } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }

  rentalurl:string ="https://localhost:7067/api/Rental/";

  RequestRental(rentalrequest:RentalRequestDTO){
    return this.http.post(this.rentalurl+"request",rentalrequest)
  }

  ApproveRental(rentalid:string){
    return this.http.put(this.rentalurl+"approve/"+rentalid,'')
  }

  CollectedRental(rentalid:string){
    return this.http.put(this.rentalurl+"collect/"+rentalid,'')
  }

  ReturnRental(rentalid:string){
    return this.http.put(this.rentalurl+"return/"+rentalid,'')
  }

  getRentalBycustomerId(id:string){
    return this.http.get<Rental[]>(this.rentalurl+ 'customer/' +id);
  }
}
