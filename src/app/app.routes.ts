import { Routes } from '@angular/router';
import { RegisterComponent } from './component/Login-Register-page/Register/register.component';
import { LoginComponent } from './component/Login-Register-page/Login/login.component';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { CustomerDashboardComponent } from './component/Customer/customer-dashboard/customer-dashboard.component';
import { MovieDetailsComponent } from './component/Customer/movie-details/movie-details.component';
import { ManagerDashboardComponent } from './component/Manager/manager-dashboard/manager-dashboard.component';
import { DvdsComponent } from './component/Manager/dvds/dvds.component';
import { RentalsComponent } from './component/Manager/rentals/rentals.component';
import { CustomerComponent } from './component/Manager/customer/customer.component';
import { DvdDetailsComponent } from './component/Manager/dvd-details/dvd-details.component';
import { CustomerDetailsComponent } from './component/Manager/customer-details/customer-details.component';
import { DashboardDetailsComponent } from './component/Manager/dashboard-details/dashboard-details.component';
import { customerGuard } from './Authguard/customer.guard';

export const routes: Routes = [
    {path:'' , component:LandingpageComponent},
    {path:'home' , component:LandingpageComponent},
    {path:'Dvd/Register' , component:RegisterComponent},
    {path:'Dvd/Login' , component:LoginComponent,canActivate:[customerGuard]},

    {
       path:'Customer/:id',component:CustomerDashboardComponent,children:[
         {path:'Moviedetails/:id' , component:MovieDetailsComponent}
       ]
    },
    {
        path:'Manager',component:ManagerDashboardComponent,
      //   canActivate:[authGuard],
        children:[
         {path:'DashBoard' , component:DashboardDetailsComponent},
         {path:'Dvd' , component:DvdsComponent},
         {path:'Dvd-Details/:id' , component:DvdDetailsComponent},
         {path:'Customer' , component:CustomerComponent},
         {path:'Customer-Details/:id' , component:CustomerDetailsComponent},
         {path:'Rental' , component:RentalsComponent}

   
        ]
     }
];
