import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Center {
  id: string;
  name: string;
  location: string;
  availableSlots: number;
  morningSlots: number;
  afternoonSlots: number;
  eveningSlots: number;
  latitude: number;
  longitude: number;
  icon:String;
}

@Injectable({
  providedIn: 'root'
})
export class CommonDataServiceService {
  CenterDetails: Center[] = [];

  constructor(private http: HttpClient) {}

  getCenterDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/slot-bookings');
  }

  // Method to extract and return unique center details
  getFilteredCenterDetails(data: any): Center[] {
    // Using a Map to ensure uniqueness based on center id
    const uniqueCenters = new Map();

    data.forEach((item: any) => {
      const centerId = item.center.id;

      if (!uniqueCenters.has(centerId)) {
        uniqueCenters.set(centerId, {
          id: item.center.id,
          name: item.center.name,
          location: item.center.location,
          availableSlots: item.center.availableSlots,
          morningSlots: item.center.morningSlots,
          afternoonSlots: item.center.afternoonSlots,
          eveningSlots: item.center.eveningSlots,
          latitude: item.center.latitude,
          longitude: item.center.longitude,
          icon: "https://img.icons8.com/color/48/000000/car.png"
        });
      }
    });

    // Return an array of unique centers
    const uniqueCentersArray = Array.from(uniqueCenters.values());
    console.log(uniqueCentersArray); // For debugging

    return uniqueCentersArray;
  }
}
