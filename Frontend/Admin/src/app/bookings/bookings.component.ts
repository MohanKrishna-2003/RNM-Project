import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: 'Details for booking',
      html: `
        <strong>User Name:</strong> ${booking.name} <br>
        <strong>Car:</strong> ${booking.selectedCarDetails} <br>
        <strong>Date:</strong> ${booking.preferredDate} <br>
        <strong>Status:</strong> ${booking.status} <br>
        <strong>User Phone:</strong> ${booking.phone} <br>
        <strong>Email:</strong> ${booking.email} <br>
        <strong>Address:</strong> ${booking.address} <br>
        <strong>Timeslot:</strong> ${booking.timeslot} <br>
        <strong>Showroom Location:</strong> ${booking.showroomLocation} <br>
        <strong>Booking Timestamp:</strong> ${booking.bookingTimeStamp}
      `,
      icon: 'info',  // You can customize the icon
      confirmButtonText: 'Close'  // Customize the button text
    });}

  cancelBooking(booking: Booking): void {
    if (confirm(`Are you sure you want to cancel this booking?`)) {
      booking.status = 'Cancelled';
    }
  }

  approveBooking(booking: Booking): void {
    booking.status = 'Confirmed';
    console.log('Approved booking:', booking);
  }
  
}
