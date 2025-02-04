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

export const routes: Routes = [
  { path: 'contact', component: ContactComponent }, // This will display the Contact component for '/contact'
  { path: 'location', component: LocationComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'car-selection-page', component: CarSelectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userbookings', component: BookingsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userfeedback', component: UserFeedbackComponent },
  { path: 'showrooms', component: ShowroomsComponent },
  { path: 'settings', component: AdminSettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'dashboard', component: AdminDashbaordComponent },
  { path: 'contact-query', component: QueryComponent },
  { path: 'news', component: NewsComponent },
];
