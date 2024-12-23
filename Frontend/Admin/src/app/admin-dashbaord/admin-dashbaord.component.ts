import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-dashbaord',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin-dashbaord.component.html',
  styleUrl: './admin-dashbaord.component.css'
})
export class AdminDashbaordComponent {

}
