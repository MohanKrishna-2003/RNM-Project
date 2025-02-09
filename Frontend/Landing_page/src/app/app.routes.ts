import { Component } from '@angular/core';
import { ComponentOptions } from './../../node_modules/@types/bootstrap/js/dist/base-component.d';
import { Routes } from '@angular/router';
import { ServiceListComponent } from './Landing Page/service-list/service-list.component';
import { HomeComponent } from './Landing Page/home/home.component';
import { LocationComponent } from './Landing Page/location/location.component';
import { ContactComponent } from './Landing Page/contact/contact.component';
import { BookingComponent } from './Landing Page/booking/booking.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedbackComponent } from './Landing Page/feedback/feedback.component';
import { CarSelectionComponent } from './car-selection/car-selection.component';
import { AdminDashbaordComponent } from './Admin/admin-dashbaord/admin-dashbaord.component';
import { UsersComponent } from './Admin/users/users.component';
import { UserFeedbackComponent } from './Admin/user-feedback/user-feedback.component';
import { ShowroomsComponent } from './Admin/showrooms/showrooms.component';
import { AdminSettingsComponent } from './Admin/admin-settings/admin-settings.component';
import { NotificationsComponent } from './Admin/notifications/notifications.component';
import { QueryComponent } from './Admin/query/query.component';
import { BookingsComponent } from './Admin/bookings/bookings.component';
import { NewsComponent } from './Landing Page/news/news.component';
import { HomeLocationComponent } from './Landing Page/home-location/home-location.component';
import { AuthorisationServiceService } from './Services/authorisation-service.service';
import { PrivacyComponent } from './Landing Page/privacy/privacy.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent }, // This will display the Contact component for '/contact'
  { path: 'location', component: LocationComponent },
  { path: 'homelocation', component: HomeLocationComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'cardetails', component: CarSelectionComponent},
  { path: 'home', component: HomeComponent },
  { path: 'userbookings', component: BookingsComponent, canActivate:[AuthorisationServiceService] },
  { path: 'users', component: UsersComponent, canActivate:[AuthorisationServiceService] },
  { path: 'userfeedback', component: UserFeedbackComponent, canActivate:[AuthorisationServiceService] },
  { path: 'showrooms', component: ShowroomsComponent , canActivate:[AuthorisationServiceService]},
  { path: 'settings', component: AdminSettingsComponent , canActivate:[AuthorisationServiceService]},
  { path: 'notifications', component: NotificationsComponent, canActivate:[AuthorisationServiceService] },
  { path: 'dashboard', component: AdminDashbaordComponent , canActivate:[AuthorisationServiceService]},
  { path: 'contact-query', component: QueryComponent , canActivate:[AuthorisationServiceService]},
  { path: 'privacy', component: PrivacyComponent },
  { path: 'news', component: NewsComponent },
];
