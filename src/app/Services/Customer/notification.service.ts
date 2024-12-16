import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerNotifications } from '../../component/modals/customer';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  rentalurl:string ="https://localhost:7067/api/Notification/";
  
   GetNotficationById(id:string){
      return this.http.get<CustomerNotifications[]>(this.rentalurl+id);
    }

    deleteNotification(Id:string){
      return this.http.delete(this.rentalurl+Id);
    }
}
