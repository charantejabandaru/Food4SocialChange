import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuoteComponent } from './shared/quote/quote.component';
import { DonationsService } from './shared/donations.service';
import { HttpClientModule } from '@angular/common/http';
import { DonationComponent } from './shared/donation/donation.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DonationsListComponent } from './shared/donations-list/donations-list.component';
import { LoginComponent  } from './login/login.component';
import { RegisterComponent  } from './register/register.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DonationPageComponent } from './donation-page/donation-page.component';
import { RecipientFormComponent } from './recipient-form/recipient-form.component';



@NgModule({
  declarations: [
    AppComponent,
    QuoteComponent,
    DonationComponent,
    HomeComponent,
    DonationsListComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DonationPageComponent,
    RecipientFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [DonationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
