import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '../../Landing Page/location/location.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showrooms',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, LocationComponent],
  templateUrl: './showrooms.component.html',
  styleUrl: './showrooms.component.css',
})
export class ShowroomsComponent  {
}
