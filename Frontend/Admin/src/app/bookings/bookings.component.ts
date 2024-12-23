import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
    searchTerm: string = '';
    bookings: Array<any> = [];
    filteredBookings: Array<any> = [];
  
    ngOnInit(): void {
      // Mock data for bookings
      this.bookings = [
        {
          car: 'Renault Kwid',
          user: 'John Doe',
          date: new Date('2024-12-01'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Duster',
          user: 'Jane Smith',
          date: new Date('2024-12-02'),
          status: 'Pending',
        },
        {
          car: 'Renault Triber',
          user: 'Peter Parker',
          date: new Date('2024-12-03'),
          status: 'Cancelled',
        },
        {
          car: 'Renault Kiger',
          user: 'Mary Jane',
          date: new Date('2024-12-04'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Kwid',
          user: 'John Doe',
          date: new Date('2024-12-01'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Duster',
          user: 'Jane Smith',
          date: new Date('2024-12-02'),
          status: 'Pending',
        },
        {
          car: 'Renault Triber',
          user: 'Peter Parker',
          date: new Date('2024-12-03'),
          status: 'Cancelled',
        },
        {
          car: 'Renault Kiger',
          user: 'Mary Jane',
          date: new Date('2024-12-04'),
          status: 'Confirmed',
        },    {
          car: 'Renault Kwid',
          user: 'John Doe',
          date: new Date('2024-12-01'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Duster',
          user: 'Jane Smith',
          date: new Date('2024-12-02'),
          status: 'Pending',
        },
        {
          car: 'Renault Triber',
          user: 'Peter Parker',
          date: new Date('2024-12-03'),
          status: 'Cancelled',
        },
        {
          car: 'Renault Kiger',
          user: 'Mary Jane',
          date: new Date('2024-12-04'),
          status: 'Confirmed',
        },    {
          car: 'Renault Kwid',
          user: 'John Doe',
          date: new Date('2024-12-01'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Duster',
          user: 'Jane Smith',
          date: new Date('2024-12-02'),
          status: 'Pending',
        },
        {
          car: 'Renault Triber',
          user: 'Peter Parker',
          date: new Date('2024-12-03'),
          status: 'Cancelled',
        },
        {
          car: 'Renault Kiger',
          user: 'Mary Jane',
          date: new Date('2024-12-04'),
          status: 'Confirmed',
        },    {
          car: 'Renault Kwid',
          user: 'John Doe',
          date: new Date('2024-12-01'),
          status: 'Confirmed',
        },
        {
          car: 'Renault Duster',
          user: 'Jane Smith',
          date: new Date('2024-12-02'),
          status: 'Pending',
        },
        {
          car: 'Renault Triber',
          user: 'Peter Parker',
          date: new Date('2024-12-03'),
          status: 'Cancelled',
        },
        {
          car: 'Renault Kiger',
          user: 'Mary Jane',
          date: new Date('2024-12-04'),
          status: 'Confirmed',
        },
      ];
      this.filteredBookings = [...this.bookings];
    }
  
    filterBookings() {
      this.filteredBookings = this.bookings.filter((booking) =>
        booking.car.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  
    viewDetails(booking: any) {
      alert(` Details for booking: \n User Name : ${booking.user} \n Car: ${booking.car} \n  Date: ${booking.date} \n  Status : ${booking.status}`);
    }
  
    cancelBooking(booking: any) {
      if (confirm(`Are you sure you want to cancel this booking?`)) {
        booking.status = 'Cancelled';
      }
    }
  
}
