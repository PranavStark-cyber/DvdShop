import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginandregisterService {

  constructor(private http:HttpClient) { }

  useurl:string ="https://localhost:7067/api/Customer/";

  register(user:User){
    return this.http.post<User>(this.useurl+"RegisterUser",user)
  }

  Loginuser(login:Login){
    return this.http.post<Login>(this.useurl+"",login)
  }
}


