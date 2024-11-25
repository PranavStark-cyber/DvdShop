import { Routes } from '@angular/router';
import { RegisterComponent } from './component/Login-Register-page/Register/register.component';
import { LoginComponent } from './component/Login-Register-page/Login/login.component';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { CustomerDashboardComponent } from './component/Customer/customer-dashboard/customer-dashboard.component';
import { MovieListComponent } from './component/Customer/movie-list/movie-list.component';
import { MovieDetailsComponent } from './component/Customer/movie-details/movie-details.component';
import { ManagerDashboardComponent } from './component/Manager/manager-dashboard/manager-dashboard.component';

export const routes: Routes = [
    {path:'' , component:LandingpageComponent},
    {path:'home' , component:LandingpageComponent},
    {path:'Dvd/Register' , component:RegisterComponent},
    {path:'Dvd/Login' , component:LoginComponent},

    {
       path:'Customer',component:CustomerDashboardComponent,children:[
         {path:'Moviecollection' , component:MovieListComponent},
         {path:'Moviedetails/:id' , component:MovieDetailsComponent}
       ]
    },
    {
        path:'Manager',component:ManagerDashboardComponent,children:[
         
        ]
     }
];
