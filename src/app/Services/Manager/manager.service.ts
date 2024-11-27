import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Director, Dvd, DvdRequest, genres } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private http:HttpClient) { }

  useurl:string ="https://localhost:7067/api/Manager";

  GetAllGenare(){
    return this.http.get<genres[]>(this.useurl+"/GetAllGenare")
  }
  GetAllDirector(){
    return this.http.get<Director[]>(this.useurl+"/GetAllDirector")
  }

  GetAllDvds(){
    return this.http.get<Dvd[]>(this.useurl+"/GetAllDvds")
  }

  AddDvd(dvd:DvdRequest){
    return this.http.post(this.useurl+"/AddDvd",dvd)
  }
  
}


