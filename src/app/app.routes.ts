import { Routes } from '@angular/router';
import { RegisterComponent } from './component/Login-Register-page/Register/register.component';
import { LoginComponent } from './component/Login-Register-page/Login/login.component';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { CustomerDashboardComponent } from './component/Customer/customer-dashboard/customer-dashboard.component';

export const routes: Routes = [
    {path:'' , component:LandingpageComponent},
    {path:'home' , component:LandingpageComponent},
    {path:'Dvd/Register' , component:RegisterComponent},
    {path:'Dvd/Login' , component:LoginComponent},

    {
       path:'Customer/:id',component:CustomerDashboardComponent,children:[

       ]
    },
    {
        path:'Manager/:id',component:CustomerDashboardComponent,children:[
         
        ]
     }
];
