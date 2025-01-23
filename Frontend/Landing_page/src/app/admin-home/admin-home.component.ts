import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
