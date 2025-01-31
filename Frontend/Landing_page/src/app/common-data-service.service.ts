import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

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
export class CommonDataServiceService  {

  CenterDetails: Center[] = [];
  maindata: any;
  constructor(private http: HttpClient) {}
  totalcentres: number;
  totalusers: number;
  userdata: any;
  userwithfeedbacks : any;

  getCenterDetails(): Observable<any> {
    this.maindata= this.http.get<any>('http://localhost:8080/api/slot-bookings');
    return this.maindata;
  }

  getUserandFeedback(): Observable<any> {
    this.userwithfeedbacks= this.http.get<any>('http://localhost:8080/user/with-feedback');
    return this.userwithfeedbacks;
  }

  getUsers(): Observable<any> {
    this.userdata= this.http.get<any>('http://localhost:8080/api/slot-bookings');
    return this.maindata;
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
    this.totalcentres = uniqueCentersArray.length;
    console.log(this.totalcentres);
    return uniqueCentersArray;
  }

  users: any[] = [];
  feedbacks : any=[];
  bookings : any[]=[];
  
  // 
  // getUserDetails(maindata: any): any {
  //   this.users = maindata.map((item: any) => item.user);
  //   this.totalusers= this.users.length;
  //   console.log(this.totalusers);
  //   return this.users;
  // }
  
  getfeedbacks(maindata: any): any {
    // maindata.forEach((item: any) => {
    //   this.feedbacks = this.feedbacks.concat(item.user.feedbacks);
    // });
    this.feedbacks = maindata.map((item: any) => item.feedbacks);
    console.log(this.feedbacks);
    return this.feedbacks;
  }
  
  categorizeFeedbacks(feedbackData: any[]): any {
    const result: any = {};

    feedbackData.forEach(user => {
        // Process each feedback for the user
        user.feedbacks.forEach((feedback: any) => {
            // Get the feedback month-year (e.g. "January 2024", "February 2024")
            const feedbackMonth = formatDate(feedback.feedbackDate, 'MMMM yyyy', 'en-US');

            // Initialize the result object for this month if not already
            if (!result[feedbackMonth]) {
                result[feedbackMonth] = { positive: 0, negative: 0 };
            }

            // Categorize the feedback based on userRatings
            if (feedback.userRatings > 2) {
                result[feedbackMonth].positive++;
            } else {
                result[feedbackMonth].negative++;
            }
        });
    });

    console.log(result);
    return result;
}

getTotalUniqueUsers(feedbackData: any[]): number {
  const uniqueUserIds = new Set(feedbackData.map(user => user.userId));
  return uniqueUserIds.size;
}

getUsersRegisteredCountInLast30Days(feedbackData: any[]): number {
  const today = new Date();  // Get the current date
  const thirtyDaysAgo = new Date(today);  // Clone the current date
  thirtyDaysAgo.setDate(today.getDate() - 30);  // Subtract 30 days

  // Filter and count users whose registrationDate is within the last 30 days
  const usersRegisteredInLast30Days = feedbackData.filter((user: any) => {
    const registrationDate = new Date(user.registrationDate);  // Convert registrationDate to Date object
    return registrationDate >= thirtyDaysAgo && registrationDate <= today;  // Check if within last 30 days
  });

  // Return the count of users
  return usersRegisteredInLast30Days.length;
}

getUsersCountByMonth(feedbackData: any[]): any[] {
  const monthCount: any = {};

  feedbackData.forEach((user: any) => {
    // Get the registration month and year from registrationDate
    const registrationDate = new Date(user.registrationDate);
    const month = registrationDate.toLocaleString('default', { month: 'long' });  // Get the full month name (e.g. "January")
    
    // Initialize the month if it doesn't exist
    if (!monthCount[month]) {
      monthCount[month] = 0;
    }

    // Increment the user count for the respective month
    monthCount[month]++;
  });

  // Convert the monthCount object into the desired format
  const result = Object.keys(monthCount).map(month => ({
    month: month,
    count: monthCount[month]
  }));

  // Sort by month name (optional)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
  ];

  return result.sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));
}

getUsersSlotCountByMonth(feedbackData: any[]): any[] {
  const monthCount: any = {};

  feedbackData.forEach((user: any) => {
    // Extract month and year from the registration date
    const registrationDate = new Date(user.bookingTimeStamp);
    const month = registrationDate.toLocaleString('default', { month: 'long' }); // Get the full month name (e.g. "January")
    
    // Initialize the month if it doesn't exist
    if (!monthCount[month]) {
      monthCount[month] = 0;
    }

    // Increment the user count for the respective month
    monthCount[month]++;
  });

  // Convert the monthCount object into the desired format
  const result = Object.keys(monthCount).map(month => ({
    month: month,
    count: monthCount[month]
  }));

  // Sort the result by month
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
  ];

  return result.sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));
}

getCenterAnalysis(data: any[]): any[] {
  const centerCounts: any = {};

  // Iterate through the data to extract the center name and count
  data.forEach(item => {
    const centerName = item.center.name;

    // Increment the center count or initialize it if not already in the object
    if (centerCounts[centerName]) {
      centerCounts[centerName]++;
    } else {
      centerCounts[centerName] = 1;
    }
  });

  // Convert the centerCounts object into an array of objects
  const result = Object.keys(centerCounts).map(center => ({
    centerName: center,
    totalBookings: centerCounts[center]
  }));

  return result;
}
getUniqueCenterCount(data: any[]): number {
  const centerNames = new Set();

  // Iterate through the data and add each center's name to the Set
  data.forEach(item => {
    const centerName = item.center.name;
    centerNames.add(centerName);
  });

  // The size of the Set will give us the unique count of centers
  return centerNames.size;
}
}
