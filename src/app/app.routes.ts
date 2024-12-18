import { Routes } from '@angular/router';
import { RegisterComponent } from './component/Login-Register-page/Register/register.component';
import { LoginComponent } from './component/Login-Register-page/Login/login.component';
import { LandingpageComponent } from './component/landingpage/landingpage.component';
import { CustomerDashboardComponent } from './component/Customer/customer-dashboard/customer-dashboard.component';
import { MovieDetailsComponent } from './component/Customer/movie-details/movie-details.component';
import { ManagerDashboardComponent } from './component/Manager/manager-dashboard/manager-dashboard.component';
import { DvdsComponent } from './component/Manager/dvds/dvds.component';
import { CustomerComponent } from './component/Manager/customer/customer.component';
import { DvdDetailsComponent } from './component/Manager/dvd-details/dvd-details.component';
import { CustomerDetailsComponent } from './component/Manager/customer-details/customer-details.component';
import { DashboardDetailsComponent } from './component/Manager/dashboard-details/dashboard-details.component';
import { customerGuard } from './Authguard/customer.guard';
import { CustomerhomeComponent } from './component/Customer/customerhome/customerhome.component';
import { authGuard } from './Authguard/auth.guard';
import { RentalComponent } from './component/Customer/rental/rental.component';
import { RentalHistoryComponent } from './component/Customer/rental-history/rental-history.component';
import { EditProfileComponent } from './component/Customer/edit-profile/edit-profile.component';
import { ProfileSectionComponent } from './component/Customer/profile-section/profile-section.component';
import { RentalManagerComponent } from './component/Manager/rental-manager/rental-manager.component';
import { RentalTableComponent } from './component/Manager/rental-table/rental-table.component';
import { ReportsComponent } from './component/Manager/reports/reports.component';
import { CustomernotificationComponent } from './component/Customer/customernotification/customernotification.component';
import { WatchlistComponent } from './component/Customer/watchlist/watchlist.component';

export const routes: Routes = [
    {path:'' , component:LandingpageComponent},
    {path:'home' , component:LandingpageComponent},
    {path:'Dvd/Register' , component:RegisterComponent},
    {path:'Dvd/Login' , component:LoginComponent
      ,canActivate:[customerGuard]
    },
    {
      path:'Manager',component:ManagerDashboardComponent,
      canActivate:[authGuard],
      children:[
       {path:'DashBoard' , component:DashboardDetailsComponent},
       {path:'Dvd' , component:DvdsComponent},
       {path:'Dvd-Details/:id' , component:DvdDetailsComponent},
       {path:'Customer' , component:CustomerComponent},
       {path:'Customer-Details/:id' , component:CustomerDetailsComponent},
       {path:'Rental' , component:RentalManagerComponent},
       { path: 'Rental/:status', component: RentalTableComponent },
       { path: 'Reports', component: ReportsComponent }
      ]
   },

    {
       path:'Customer',component:CustomerDashboardComponent,children:[
         {path:'Home' , component:CustomerhomeComponent},
         {path:'Movie' , component:MovieDetailsComponent},
         {path:'Rental/:id' , component:RentalComponent},
         {path:'RentalHistory' , component:RentalHistoryComponent},
         {path:'EditProfile' , component:EditProfileComponent},
         {path:'Profile' , component:ProfileSectionComponent},
         {path:'Notifications' , component:CustomernotificationComponent},
         {path:'Watchlist' , component:WatchlistComponent},
       ]
    }
    
];
