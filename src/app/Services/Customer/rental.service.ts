import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rental, RentalRequestDTO } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }

  rentalurl:string ="http://localhost:5092/api/Rental";

  RequestRental(rentalrequest:RentalRequestDTO){
    return this.http.post(this.rentalurl+"/request",rentalrequest)
  }

  ApproveRental(rentalid:string){
    return this.http.put(this.rentalurl+"/approve/"+rentalid,rentalid)
  }

  CollectedRental(rentalid:string){
    return this.http.put(this.rentalurl+"/collect/"+rentalid,rentalid)
  }

  ReturnRental(rentalid:string){
    return this.http.put(this.rentalurl+"/return/"+rentalid,rentalid)
  }
  RejectRental(rentalid:string){
    return this.http.put(this.rentalurl+"/reject/"+rentalid,rentalid)
  }

  getRentalBycustomerId(id:string){
    return this.http.get<Rental[]>(this.rentalurl+ '/customer/' +id);
  }

  getAllRentals(){
    return this.http.get<Rental[]>(this.rentalurl)
  }
}
