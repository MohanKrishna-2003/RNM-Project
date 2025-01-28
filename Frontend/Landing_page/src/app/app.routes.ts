import { Component } from '@angular/core';
import { ComponentOptions } from './../../node_modules/@types/bootstrap/js/dist/base-component.d';
import { Routes } from '@angular/router';
import { ServiceListComponent } from './service-list/service-list.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CarSelectionComponent } from './car-selection/car-selection.component';
import { AdminDashbaordComponent } from './admin-dashbaord/admin-dashbaord.component';
import { UsersComponent } from './users/users.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { QueryComponent } from './query/query.component';
import { BookingsComponent } from './bookings/bookings.component';
import { NewsComponent } from './news/news.component';


export const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path:'service-list',component:ServiceListComponent},
  // { path: 'location', component: LocationComponent },
  // {path:'service',component:ServiceListComponent}
  // {path:'home',component:HomeComponent},
  // { path: '', component: ServiceListComponent },  // This will display ServiceList on the home route
  // { path: 'service', component: ServiceListComponent },  // Same here for service route
  { path: 'contact', component: ContactComponent },  // This will display the Contact component for '/contact'
  { path: 'location', component: LocationComponent } ,
  { path: '',component:HomeComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'feedback',component:FeedbackComponent},
  { path: 'booking', component: BookingComponent },
  // { path: 'booking', component: BookingComponent },
  { path: 'car-selection-page', component: CarSelectionComponent },
  // {"path":"", component:AdminDashbaordComponent},
  // {"path":"home", component:AdminHomeComponent},
  {"path":"userbookings", component:BookingsComponent},
  {"path":"users", component:UsersComponent},
  {"path":"userfeedback", component:UserFeedbackComponent},
  {"path":"showrooms", component:ShowroomsComponent},
  {"path":"settings", component:AdminSettingsComponent},
  {"path":"notifications", component:NotificationsComponent},
  {"path":"dashboard", component:AdminDashbaordComponent},
  {"path":"contact-query", component:QueryComponent}
  { path: 'booking', component: BookingComponent },
  {path:'news',component:NewsComponent},
  {path:'feedback',component:FeedbackComponent}
];
