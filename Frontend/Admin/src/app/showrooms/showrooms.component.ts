import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showrooms',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule],
  templateUrl: './showrooms.component.html',
  styleUrl: './showrooms.component.css'
})
export class ShowroomsComponent implements OnInit {
    // Mock showroom data
    showrooms = [
      {
        name: 'Renault Delhi',
        address: 'Connaught Place, New Delhi, Delhi - 110001',
        contact: '+91-9876543210',
      },
      {
        name: 'Renault Mumbai',
        address: 'Andheri East, Mumbai, Maharashtra - 400069',
        contact: '+91-8765432109',
      },
      {
        name: 'Renault Bengaluru',
        address: 'MG Road, Bengaluru, Karnataka - 560001',
        contact: '+91-7654321098',
      },
      {
        name: 'Renault Chennai',
        address: 'T Nagar, Chennai, Tamil Nadu - 600017',
        contact: '+91-6543210987',
      },
      {
        name: 'Renault Kolkata',
        address: 'Salt Lake City, Kolkata, West Bengal - 700091',
        contact: '+91-5432109876',
      },
    ];
  
    ngOnInit(): void {}
  }
  

