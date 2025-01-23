import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule,NavbarComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {

  
}

