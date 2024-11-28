import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Director, Dvd, DvdRequest, genres } from '../../component/modals/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http:HttpClient) { }

  dvdurl:string ="https://dbk4n8j8-7067.asse.devtunnels.ms/api/Manager";

  GetAllGenare(){
    return this.http.get<genres[]>(this.dvdurl+"/GetAllGenare")
  }
  GetAllDirector(){
    return this.http.get<Director[]>(this.dvdurl+"/GetAllDirector")
  }

  GetAllDvds(){
    return this.http.get<Dvd[]>(this.dvdurl+"/GetAllDvds")
  }

  AddDvd(dvd:DvdRequest){
    return this.http.post(this.dvdurl+"/AddDvd",dvd)
  }

  deleteDvd(dvdId: string, quantityToDelete: number) {
    return this.http.post(this.dvdurl+"/delete-dvd/"+dvdId,quantityToDelete,{
      responseType:'text'
    })
  }

  getDvdById(id:string){
    return this.http.get<Dvd>(this.dvdurl+ '/GetDvdById' +id,);
  }
  updateDvd(id:string, updateDvd:DvdRequest){
    return this.http.put(this.dvdurl+ '/UpdateDvd/' +id,updateDvd,{
      responseType:'text'
    });
  }
}


