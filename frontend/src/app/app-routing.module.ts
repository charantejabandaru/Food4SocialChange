import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationsListComponent } from './shared/donations-list/donations-list.component';
import { QuoteComponent } from './shared/quote/quote.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationPageComponent } from './donation-page/donation-page.component';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'search-results',component: DonationsListComponent},
  {path:'donation-page',component: DonationPageComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path : 'login',component: LoginComponent},
  {path : 'register',component: RegisterComponent},
  {path : 'recipient-form',component:RecipientFormComponent},
  {path:'**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
