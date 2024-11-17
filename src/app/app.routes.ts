import { Routes } from '@angular/router';
import { RegisterComponent } from './component/Login-Register-page/Register/register.component';
import { LoginComponent } from './component/Login-Register-page/Login/login.component';
import { LandingpageComponent } from './component/landingpage/landingpage.component';

export const routes: Routes = [
    {path:'Dvd/Register' , component:RegisterComponent},
    {path:'Dvd/Login' , component:LoginComponent},

    {
        path:'home',component:LandingpageComponent,children:[]
    }
];
