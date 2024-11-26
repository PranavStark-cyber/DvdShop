import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dvd, DvdRequest, genres } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http:HttpClient) { }

  useurl:string ="https://w89278w3-7067.asse.devtunnels.ms/api/Manager";

  GetAllGenare(){
    return this.http.get(this.useurl+"/GetAllGenare")
  }
  GetAllDirector(){
    return this.http.get(this.useurl+"/GetAllDirector")
  }

  AddDvd(dvd:DvdRequest){
    return this.http.post(this.useurl+"/AddDvd",dvd)
  }
  
}


