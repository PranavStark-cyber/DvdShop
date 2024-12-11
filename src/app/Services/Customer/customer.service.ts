import { Injectable } from '@angular/core';
import { Customer } from '../../component/modals/customer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  customerurl:string ="https://19qbxfdw-7067.asse.devtunnels.ms/api/Customer/";

  GetAllCustomer(){
    return this.http.post<Customer[]>(this.customerurl+"GetAllCustomer",'')
  }

  GetCustomerbyId(customerid:string){
    return this.http.get<Customer>(this.customerurl+customerid)

  }
}
