import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
    searchTerm: string = '';
    bookings: any = [];
    filteredBookings: Array<any> = [];
  constructor(private http: HttpClient){}
    ngOnInit(): void {
this.http.get("http://localhost:8080/slot-bookings").subscribe((res)=>{
  console.log(res);
  this.bookings=res;
})
      // Mock data for bookings
      // this.bookings = [
      //   {
      //     car: 'Renault Kwid',
      //     user: 'John Doe',
      //     date: new Date('2024-12-01'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Duster',
      //     user: 'Jane Smith',
      //     date: new Date('2024-12-02'),
      //     status: 'Pending',
      //   },
      //   {
      //     car: 'Renault Triber',
      //     user: 'Peter Parker',
      //     date: new Date('2024-12-03'),
      //     status: 'Cancelled',
      //   },
      //   {
      //     car: 'Renault Kiger',
      //     user: 'Mary Jane',
      //     date: new Date('2024-12-04'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Kwid',
      //     user: 'John Doe',
      //     date: new Date('2024-12-01'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Duster',
      //     user: 'Jane Smith',
      //     date: new Date('2024-12-02'),
      //     status: 'Pending',
      //   },
      //   {
      //     car: 'Renault Triber',
      //     user: 'Peter Parker',
      //     date: new Date('2024-12-03'),
      //     status: 'Cancelled',
      //   },
      //   {
      //     car: 'Renault Kiger',
      //     user: 'Mary Jane',
      //     date: new Date('2024-12-04'),
      //     status: 'Confirmed',
      //   },    {
      //     car: 'Renault Kwid',
      //     user: 'John Doe',
      //     date: new Date('2024-12-01'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Duster',
      //     user: 'Jane Smith',
      //     date: new Date('2024-12-02'),
      //     status: 'Pending',
      //   },
      //   {
      //     car: 'Renault Triber',
      //     user: 'Peter Parker',
      //     date: new Date('2024-12-03'),
      //     status: 'Cancelled',
      //   },
      //   {
      //     car: 'Renault Kiger',
      //     user: 'Mary Jane',
      //     date: new Date('2024-12-04'),
      //     status: 'Confirmed',
      //   },    {
      //     car: 'Renault Kwid',
      //     user: 'John Doe',
      //     date: new Date('2024-12-01'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Duster',
      //     user: 'Jane Smith',
      //     date: new Date('2024-12-02'),
      //     status: 'Pending',
      //   },
      //   {
      //     car: 'Renault Triber',
      //     user: 'Peter Parker',
      //     date: new Date('2024-12-03'),
      //     status: 'Cancelled',
      //   },
      //   {
      //     car: 'Renault Kiger',
      //     user: 'Mary Jane',
      //     date: new Date('2024-12-04'),
      //     status: 'Confirmed',
      //   },    {
      //     car: 'Renault Kwid',
      //     user: 'John Doe',
      //     date: new Date('2024-12-01'),
      //     status: 'Confirmed',
      //   },
      //   {
      //     car: 'Renault Duster',
      //     user: 'Jane Smith',
      //     date: new Date('2024-12-02'),
      //     status: 'Pending',
      //   },
      //   {
      //     car: 'Renault Triber',
      //     user: 'Peter Parker',
      //     date: new Date('2024-12-03'),
      //     status: 'Cancelled',
      //   },
      //   {
      //     car: 'Renault Kiger',
      //     user: 'Mary Jane',
      //     date: new Date('2024-12-04'),
      //     status: 'Confirmed',
      //   },
      // ];
      this.filteredBookings = [...this.bookings];
    }
  
    // filterBookings() {
    //   this.filteredBookings = this.bookings.filter((booking) =>
    //     booking.car.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // }
  
    viewDetails(booking: any) {
      alert(` Details for booking: \n User Name : ${booking.name} \n Car: ${booking.selectedCarDetails} \n  Date: ${booking.preferredDate} \n  Status : ${booking.status} \n User Phone : ${booking.phone} \n Email: ${booking.email} \n  address: ${booking.address} \n  timeslot : ${booking.timeslot} \n Showroom Location : ${booking.showroomLocation} \n Booking TimeStamp: ${booking.bookingTimeStamp} `);
    }
  
    cancelBooking(booking: any) {
      if (confirm(`Are you sure you want to cancel this booking?`)) {
        booking.status = 'Cancelled';
      }
    }
  
}
