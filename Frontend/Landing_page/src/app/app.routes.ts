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
import { NewsComponent } from './news/news.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CarSelectionComponent } from './car-selection/car-selection.component';

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
  { path: 'booking', component: BookingComponent },
  {path:'news',component:NewsComponent},
  {path:'feedback',component:FeedbackComponent},
  {path:'car-selection-page',component:CarSelectionComponent}

];
