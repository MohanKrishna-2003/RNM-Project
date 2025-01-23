import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { LocationComponent } from '../location/location.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showrooms',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, LocationComponent],
  templateUrl: './showrooms.component.html',
  styleUrl: './showrooms.component.css'
})
export class ShowroomsComponent implements OnInit {
  constructor(private http: HttpClient){}
    // Mock showroom data
    //  nissanShowrooms = [
    //   {
    //     name: 'Nissan Delhi',
    //     address: 'Connaught Place, New Delhi, Delhi - 110001',
    //     contact: '+91-9876543210',
    //   },
    //   {
    //     name: 'Nissan Mumbai',
    //     address: 'Andheri West, Mumbai, Maharashtra - 400053',
    //     contact: '+91-8765432109',
    //   },
    //   {
    //     name: 'Nissan Bengaluru',
    //     address: 'MG Road, Bengaluru, Karnataka - 560001',
    //     contact: '+91-7654321098',
    //   },
    //   {
    //     name: 'Nissan Chennai',
    //     address: 'T Nagar, Chennai, Tamil Nadu - 600017',
    //     contact: '+91-6543210987',
    //   },
    //   {
    //     name: 'Nissan Kolkata',
    //     address: 'Salt Lake City, Kolkata, West Bengal - 700091',
    //     contact: '+91-5432109876',
    //   },
    //   {
    //     name: 'Nissan Pune',
    //     address: 'Viman Nagar, Pune, Maharashtra - 411014',
    //     contact: '+91-4321098765',
    //   },
    // ];
    
    //  mitsubishiShowrooms = [
    //   {
    //     name: 'Mitsubishi Delhi',
    //     address: 'Rohini, New Delhi, Delhi - 110085',
    //     contact: '+91-9812345678',
    //   },
    //   {
    //     name: 'Mitsubishi Mumbai',
    //     address: 'Lower Parel, Mumbai, Maharashtra - 400013',
    //     contact: '+91-9801234567',
    //   },
    //   {
    //     name: 'Mitsubishi Bengaluru',
    //     address: 'Whitefield, Bengaluru, Karnataka - 560066',
    //     contact: '+91-9701234567',
    //   },
    //   {
    //     name: 'Mitsubishi Chennai',
    //     address: 'Velachery, Chennai, Tamil Nadu - 600042',
    //     contact: '+91-9601234567',
    //   },
    //   {
    //     name: 'Mitsubishi Kolkata',
    //     address: 'Park Street, Kolkata, West Bengal - 700016',
    //     contact: '+91-9501234567',
    //   },
    //   {
    //     name: 'Mitsubishi Hyderabad',
    //     address: 'Banjara Hills, Hyderabad, Telangana - 500034',
    //     contact: '+91-9001234567',
    //   },
    // ];
    
    //  renaultShowrooms = [
    //   {
    //     name: 'Renault Delhi',
    //     address: 'Connaught Place, New Delhi, Delhi - 110001',
    //     contact: '+91-9876543210',
    //   },
    //   {
    //     name: 'Renault Mumbai',
    //     address: 'Andheri East, Mumbai, Maharashtra - 400069',
    //     contact: '+91-8765432109',
    //   },
    //   {
    //     name: 'Renault Bengaluru',
    //     address: 'MG Road, Bengaluru, Karnataka - 560001',
    //     contact: '+91-7654321098',
    //   },
    //   {
    //     name: 'Renault Chennai',
    //     address: 'T Nagar, Chennai, Tamil Nadu - 600017',
    //     contact: '+91-6543210987',
    //   },
    //   {
    //     name: 'Renault Kolkata',
    //     address: 'Salt Lake City, Kolkata, West Bengal - 700091',
    //     contact: '+91-5432109876',
    //   },
    //   {
    //     name: 'Renault Pune',
    //     address: 'Viman Nagar, Pune, Maharashtra - 411014',
    //     contact: '+91-4321098765',
    //   },
    // ];
    
    showrooms:any;
    
    ngOnInit(): void {
this.http.get("")

    }
  }
  

