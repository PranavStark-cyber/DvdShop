import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, Director, Dvd, DvdRequest, Manager, Watchlist, genres } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http: HttpClient) { }

  dvdurl: string = "https://localhost:7067/api/Manager";

  GetAllGenare() {
    return this.http.get<genres[]>(this.dvdurl + "/GetAllGenare")
  }
  GetAllDirector() {
    return this.http.get<Director[]>(this.dvdurl + "/GetAllDirector")
  }

  GetAllDvds() {
    return this.http.get<Dvd[]>(this.dvdurl + "/GetAllDvds")
  }

  AddDvd(dvd: DvdRequest) {
    return this.http.post(this.dvdurl + "/AddDvd", dvd)
  }

  deleteDvd(dvdId: string, quantityToDelete: number) {
    return this.http.post(this.dvdurl + "/delete-dvd/" + dvdId, quantityToDelete, {
      responseType: 'text'
    })
  }

  getDvdById(id: string) {
    return this.http.get<Dvd>(this.dvdurl + '/GetDvdById' + id,);
  }
  updateDvd(id: string, updateDvd: DvdRequest) {
    return this.http.put(this.dvdurl + '/UpdateDvd/' + id, updateDvd, {
      responseType: 'text'
    });
  }

  GetManagerbyId(managerid:string){
    return this.http.get<Manager>(this.dvdurl+'/'+managerid)

  }
  getAllInventory(){
    return this.http.get<any>('https://localhost:7067/api/Inventory/available-and-total')
  }

  getTotalEarnings(){
    return this.http.get<any>('https://localhost:7067/api/Payment/total-earnings')
  }

  addWatchlist(AddWatchlist:Watchlist){
    return this.http.post("https://localhost:7067/api/AddWatchlist",AddWatchlist)
  }

  getWatchlist(customerId:string){
    return this.http.get<watchlists[]>("https://localhost:7067/api/AddWatchlist/by-customer/"+customerId)
  }
}



export interface watchlists{
  id:string;
  customerId:string;
  dvdId:string;
  customer:Customer;
  dvd:Dvd;

}

