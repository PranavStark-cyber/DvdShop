import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class LoginandregisterService {

  constructor(private http:HttpClient) { }

  useurl:string ="https://z9j6jhqq-7067.asse.devtunnels.ms/api/User";

  register(user:User){
    return this.http.post<User>(this.useurl+"/register",user)
  }

  Loginuser(login:Login){
    return this.http.post<Login>(this.useurl+"/Login",login,{
      responseType:'text' as 'json'
      
    });
  }
  isLoggedin():boolean{
    const token:string= localStorage.getItem("token")!;
    if(token){
      return true;
    }else{
      return false;
    }
  }
}


