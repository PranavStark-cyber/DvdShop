import { Injectable } from '@angular/core';
import { Customer, UpdateCustomer } from '../../component/modals/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  customerurl:string ="https://localhost:7067/api/Customer/";

  GetAllCustomer(){
    return this.http.post<Customer[]>(this.customerurl+"GetAllCustomer",'')
  }

  GetCustomerbyId(customerid:string){
    return this.http.get<Customer>(this.customerurl+customerid)

  }
  updatecustomer(id:string, updateCustomer:UpdateCustomer){
    return this.http.put(this.customerurl+id,updateCustomer,{
      responseType:'text'
    });
  }
}
