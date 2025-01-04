import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}
