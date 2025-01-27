import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
interface Booking {
  id:number;
  user_id: number;
  name: string;
  selectedCarDetails: string;
  preferredDate: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  timeSlot: string;
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
    this.http.get<Booking[]>("http://localhost:8080/api/slot-bookings").subscribe((res) => {
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
        <strong>Timeslot:</strong> ${booking.timeSlot} <br>
        <strong>Showroom Location:</strong> ${booking.showroomLocation} <br>
        <strong>Booking Timestamp:</strong> ${booking.bookingTimeStamp}
      `,
      icon: 'info',  // You can customize the icon
      confirmButtonText: 'Close'  // Customize the button text
    });}

  cancelBooking(booking: Booking): void {
   let data={
    "id":booking.id,
    "status":"Cancelled"
    }
    let email={
      "recipient":"nayanadece@gmail.com",
      "text":"We are sorry to inform you that your booking for the date "+booking.preferredDate+" is cancelled. Sorry for the inconvinience!!",
      "subject":"BOOKING CANCELLED !"
    }
    if (confirm(`Are you sure you want to cancel this booking?`)) {
      this.http.post("http://localhost:8080/api/slot-bookings/updatestatus",data).subscribe((res) => {
       console.log(res);
       
      });

      this.http.post("http://localhost:8080/mail/sendmail",email).subscribe((res) => {
        console.log(res);
        
       });
      booking.status = 'Cancelled';

    }
  }

  approveBooking(booking: Booking): void {
    let data={
      "id":booking.id,
      "status":"Confirmed"
      }
      let email={
        "recipient":"nayanadece@gmail.com",
        "text":"Dear User! Your booking has been confirmed for "+booking.preferredDate,
        "subject":"BOOKING CONFIRMATION !"
      }
      this.http.post("http://localhost:8080/api/slot-bookings/updatestatus",data).subscribe((res) => {
        console.log(res);
        
       });
       this.http.post("http://localhost:8080/mail/sendmail",email).subscribe((res) => {
        console.log(res);
        
       });
    booking.status = 'Confirmed';
    console.log('Approved booking:', booking);
  }
  
}