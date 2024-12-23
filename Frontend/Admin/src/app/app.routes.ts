import { Routes } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashbaordComponent } from './admin-dashbaord/admin-dashbaord.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { ShowroomsComponent } from './showrooms/showrooms.component';

export const routes: Routes = [
    {"path":"", component:AdminHomeComponent},
    {"path":"home", component:AdminHomeComponent},
    {"path":"bookings", component:BookingsComponent},
    {"path":"users", component:UsersComponent},
    {"path":"feedback", component:UserFeedbackComponent},
    {"path":"showrooms", component:ShowroomsComponent},
    {"path":"dashboard", component:AdminDashbaordComponent}

];
