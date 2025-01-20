import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Booking {
  name: string;
  selectedCarDetails: string;
  preferredDate: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  timeslot: string;
  showroomLocation: string;
  bookingTimeStamp: string;
}

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  searchTerm: string = '';
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  pageSize: number = 10;
  page: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Booking[]>("http://localhost:8080/slot-bookings").subscribe((res) => {
      this.bookings = res;
      this.filteredBookings = this.bookings.slice(0, this.pageSize);
    });
  }

  filterBookings() {
    if (this.searchTerm.trim() === '') {
      this.filteredBookings = this.bookings.slice(0, (this.page + 1) * this.pageSize);
    } else {
      const filtered = this.bookings.filter((booking) =>
        booking.selectedCarDetails.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.filteredBookings = filtered.slice(0, (this.page + 1) * this.pageSize);
    }
  }

  loadMore() {
    this.page++;
    const startIndex = this.page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    if (startIndex < this.bookings.length) {
      this.filteredBookings = [...this.filteredBookings, ...this.bookings.slice(startIndex, endIndex)];
    }
  }

  viewDetails(booking: Booking): void {
    alert(`Details for booking: 
      User Name : ${booking.name} 
      Car: ${booking.selectedCarDetails} 
      Date: ${booking.preferredDate} 
      Status : ${booking.status} 
      User Phone : ${booking.phone} 
      Email: ${booking.email} 
      Address: ${booking.address} 
      Timeslot: ${booking.timeslot} 
      Showroom Location : ${booking.showroomLocation} 
      Booking Timestamp: ${booking.bookingTimeStamp}`);
  }

  cancelBooking(booking: Booking): void {
    if (confirm(`Are you sure you want to cancel this booking?`)) {
      booking.status = 'Cancelled';
    }
  }
}
