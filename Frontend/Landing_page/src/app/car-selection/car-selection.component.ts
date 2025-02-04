import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../Landing Page/header/header.component';
import { FooterComponent } from '../Landing Page/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-car-selection',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.css'],
})
export class CarSelectionComponent implements OnInit {
  staticPics: string[] = [
    'assets/carImages/renault-koleos.jpg',
    'assets/carImages/renault-arkana.webp',
    'assets/carImages/renault-zoe.jpg',
    'assets/carImages/renault-fluence.webp',
  ];

  currentImageIndex: number = 0;
  showFilters: boolean = false;
  displayedCars: any[] = [];
  cars: any[] = [];
  showGif: boolean = true;
  gifPath: string = 'assets/gifs/loading.gif';
  isBookingClicked: boolean = false;
  selectedCar: any = null;
  isFilterSidebarOpen: boolean = false;
  // selectedPrice: string = '';
  sortBy: string = '';
  todayDate: string;
  status: boolean = true;
  currentStep: number = 1;

  formData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: new Date(),
    status: 'pending',
    timeSlot: '',
    confirmation: false,
  };

  brands: any[] = [];
  selectedBrand: string = 'Renault';
  selectedCenter: any;
  filteredLocations: any[] = [];
  availableTimeSlots: any[] = [];
  selectedCenterId: number = 1;

  private apiUrl = 'http://localhost:8080/api/slot-bookings';

  constructor(private http: HttpClient, private router: Router) {
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  // constructor(private http: HttpClient) {
  //   console.log("working");
  //   console.log(this.filteredLocations);
  //   const today = new Date();
  //   this.todayDate = today.toISOString().split('T')[0];
  // }
  userId: string | null= null;

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/brands').subscribe(
      (data) => {
        this.brands = data;
        console.log(this.brands);
      },
      (error) => {
        console.error('Error fetching brands data', error); // Handle error
      }
    );
    this.fetchCarsFromBackend();
    this.startImageCycle();
    this.handleScroll();
    this.userId = localStorage.getItem('id'); // Retrieve from localStorage
    if (this.userId) {
      console.log('User ID loaded from localStorage:', this.userId);
    } else {
      console.error('User ID not found in localStorage');
    }

    const name = localStorage.getItem('username');
    const email = localStorage.getItem('useremail');
    const phone = localStorage.getItem('phone');
    const address = localStorage.getItem('address');
    if (name) {
      this.formData.name = name;
    }
    if (email) {
      this.formData.email = email;
    }
    if (phone) {
      this.formData.phone = phone;
    }
    if (address) {
      this.formData.address = address;
    }
  }

  getFilteredCenters(): void {
    if (this.selectedBrand) {
      const selectedBrand = this.brands.find(
        (brand) => brand.name.toLowerCase() === this.selectedBrand.toLowerCase()
      );

      if (selectedBrand) {
        this.filteredLocations = selectedBrand.centers || []; // Assign the centers
      } else {
        this.filteredLocations = []; // Reset if brand is not found
      }
    } else {
      this.filteredLocations = []; // Reset if no brand is selected
    }
  }

  // Update time slots based on the selected showroom location
  updateAvailableTimeSlots(selectedCenterId: number | string): void {
    console.log('Filtered Locations:', this.filteredLocations);
    console.log('Selected Center ID:', selectedCenterId);

    // Ensure selectedCenterId is a number
    const centerId =
      typeof selectedCenterId === 'string'
        ? Number(selectedCenterId)
        : selectedCenterId;

    const selectedCenter = this.filteredLocations.find(
      (center) => center.id === centerId
    );
    console.log('Selected Center:', selectedCenter);

    if (selectedCenter) {
      this.availableTimeSlots = [
        {
          key: 'morning',
          label: 'Morning (9:00 AM - 12:00 PM)',
          count: selectedCenter.morningSlots,
        },
        {
          key: 'afternoon',
          label: 'Afternoon (12:00 PM - 3:00 PM)',
          count: selectedCenter.afternoonSlots,
        },
        {
          key: 'evening',
          label: 'Evening (3:00 PM - 6:00 PM)',
          count: selectedCenter.eveningSlots,
        },
      ].filter((slot) => slot.count > 0); // Only show slots with availability
    } else {
      this.availableTimeSlots = []; // Reset if no center is selected
    }
  }

  fetchCarsFromBackend(): void {
    this.http.get<any[]>('http://localhost:8080/api/cars').subscribe((cars) => {
      this.cars = cars;
      this.displayedCars = [...this.cars];
      console.log(this.displayedCars);

      this.showGif = false;

      this.displayedCars.forEach((car) => {
        car.bookSlot = () => {
          this.selectedBrand = car.brand; // Set the selected brand based on clicked car
          // this.updateShowroomLocations(); // Update showroom locations based on selected brand
        };
      });
      // console.log(this.displayedCars)
    });
  }

  displayCars(brand: string): void {
    this.showFilters = true;
    if (brand) {
      this.displayedCars = this.cars.filter((car) => car.brand === brand);
      this.showGif = false;
    } else {
      this.displayedCars = [...this.cars];
      this.showGif = false;
    }
  }

  startImageCycle(): void {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.staticPics.length;
    }, 2000);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.handleScroll();
  }

  private handleScroll(): void {
    const elements = document.querySelectorAll('.car-card');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  }

  toggleFilterSidebar(): void {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  toggleBooking(carName: String): void {
    const isLoggedIn = localStorage.getItem('login') !== null;
    if (!isLoggedIn) {
      alert('Please log in to book a slot');
      this.router.navigateByUrl('/login');
    }
    this.isBookingClicked = !this.isBookingClicked;
    this.selectedCar = this.cars.find((car) => car.name === carName);
    if (this.selectedCar) {
      this.getFilteredCenters();
    }
  }

  // toggleBooking(carName: String): void {
  //   this.isBookingClicked = !this.isBookingClicked;
  //   this.selectedCar = this.cars.find((car) => car.name === carName);
  //   console.log(this.selectedCar);
  //   if (this.selectedCar) {
  //     this.getFilteredCenters();
  //   }
  // }

  closeForm(): void {
    this.isBookingClicked = !this.isBookingClicked;
  }

  applyFilters(): void {
    this.showGif = false;
  }

  minPrice: number = 0;
  maxPrice: number = 30000000;
  selectedPrice: number = this.maxPrice;

  // filterCarsByPrice(event: Event): void {
  //   const selectedPrice = (event?.target as HTMLSelectElement).value;
  //   this.displayedCars = this.cars.filter((car) => {
  //     const rawPrice = car.price?.INR;
  //     if (!rawPrice) return false;
  //     const normalizedPrice = this.normalizePrice(rawPrice);
  //     switch (selectedPrice) {
  //       case 'low':
  //         return normalizedPrice < 1000000;
  //       case 'mid':
  //         return normalizedPrice >= 1000000 && normalizedPrice <= 2000000;
  //       case 'high':
  //         return normalizedPrice > 2000000;
  //       default:
  //         return true;
  //     }
  //   });
  //   this.showGif = false;
  // }

  // normalizePrice(rawPrice: string): number {
  //   let numericPrice = rawPrice.replace(/[₹$,]/g, '').trim();
  //   if (numericPrice.includes('Crore')) {
  //     numericPrice = numericPrice.replace('Crore', '').trim();
  //     return parseFloat(numericPrice) * 10000000;
  //   }
  //   if (numericPrice.includes('Lakhs')) {
  //     numericPrice = numericPrice.replace('Lakhs', '').trim();
  //     return parseFloat(numericPrice) * 100000;
  //   }
  //   return parseFloat(numericPrice) || 0;
  // }

  filterCarsByPrice(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedPrice = parseFloat(target.value);
    console.log('Selected Price: ', selectedPrice);

    this.displayedCars = this.cars.filter((car) => {
      const rawPrice = car.price?.INR;

      if (!rawPrice) return false;

      const normalizedPrice = this.normalizePrice(rawPrice);

      console.log('Normalized Price: ', normalizedPrice);

      return normalizedPrice <= selectedPrice;
    });

    this.showGif = false;
  }

  normalizePrice(rawPrice: string): number {
    let numericPrice = rawPrice.replace(/[₹$,]/g, '').trim();

    if (numericPrice.includes('Crore')) {
      numericPrice = numericPrice.replace('Crore', '').trim();
      return parseFloat(numericPrice) * 10000000;
    }

    if (numericPrice.includes('Lakhs')) {
      numericPrice = numericPrice.replace('Lakhs', '').trim();
      return parseFloat(numericPrice) * 100000;
    }
    console.log('raw Price: ', numericPrice);

    return parseFloat(numericPrice) || 0;
  }

  confirm() {
    alert(
      'Your booking slot is confirmed... please await further instructions.....'
    );
  }

  sortByOrder(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    if (sortBy === 'maxPrice') {
      this.displayedCars = this.cars.sort(
        (a, b) =>
          this.normalizePrice(b.price.INR) - this.normalizePrice(a.price.INR)
      );
    } else if (sortBy === 'minPrice') {
      this.displayedCars = this.cars.sort(
        (a, b) =>
          this.normalizePrice(a.price.INR) - this.normalizePrice(b.price.INR)
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByCarType(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedType = target.value;
    if (selectedType) {
      this.displayedCars = this.cars.filter((car) =>
        car.details?.toLowerCase().includes(selectedType.toLowerCase())
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByRating(event: Event): void {
    const selectedRating = (event.target as HTMLSelectElement).value;
    if (selectedRating) {
      this.displayedCars = this.cars.filter(
        (car) => car.rating === parseInt(selectedRating, 10)
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByEngine(event: Event): void {
    const selectedEngine = (event.target as HTMLSelectElement).value;
    if (selectedEngine) {
      this.displayedCars = this.cars.filter(
        (car) => car.engineType.toLowerCase() === selectedEngine.toLowerCase()
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterBySeater(event: Event): void {
    const selectedSeater = (event.target as HTMLSelectElement).value;
    if (selectedSeater) {
      this.displayedCars = this.cars.filter(
        (car) => car.seats === parseInt(selectedSeater, 10)
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByTransmission(event: Event): void {
    const selectedTransmission = (event.target as HTMLSelectElement).value;
    if (selectedTransmission) {
      this.displayedCars = this.cars.filter(
        (car) =>
          car.transmission.toLowerCase() === selectedTransmission.toLowerCase()
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByAvailability(event: Event): void {
    const selectedAvailability = (event.target as HTMLSelectElement).value;
    if (selectedAvailability) {
      this.displayedCars = this.cars.filter(
        (car) =>
          car.availability.toLowerCase() === selectedAvailability.toLowerCase()
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByFuelEfficiency(event: Event): void {
    const selectedFuelEfficiency = (event.target as HTMLSelectElement).value;
    if (selectedFuelEfficiency) {
      this.displayedCars = this.cars.filter(
        (car) => car.fuelEfficiency <= parseInt(selectedFuelEfficiency, 10)
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByColor(event: Event): void {
    const selectedColor = (event.target as HTMLSelectElement).value;
    if (selectedColor) {
      this.displayedCars = this.cars.filter(
        (car) => car.color.toLowerCase() === selectedColor.toLowerCase()
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByDriveType(event: Event): void {
    const selectedDriveType = (event.target as HTMLSelectElement).value;
    if (selectedDriveType) {
      this.displayedCars = this.cars.filter(
        (car) => car.driveType.toLowerCase() === selectedDriveType.toLowerCase()
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByWarranty(event: Event): void {
    const selectedWarranty = (event.target as HTMLSelectElement).value;
    if (selectedWarranty) {
      this.displayedCars = this.cars.filter(
        (car) => car.warranty === selectedWarranty
      );
    } else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    } else {
      this.submitForm();
    }
  }

  goBack(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    // Check if preferredDate is a valid date object, and if not, attempt to convert it
    let formattedDate = '';
    if (this.formData.preferredDate) {
      const preferredDate = new Date(this.formData.preferredDate);
      if (!isNaN(preferredDate.getTime())) {
        formattedDate = preferredDate.toISOString();
      } else {
        console.error('Invalid date:', this.formData.preferredDate);
      }
    }

    const email = this.formData.email;
    if (this.userId) {
      console.log('User ID retrieved from localStorage:', this.userId);
      // Proceed with submitting the form after retrieving the userId
      this.submitBookingForm(formattedDate);
    } else {
      console.error('User ID not found in localStorage');
      alert('Unable to retrieve user details. Please login again.');
    }
  }

  submitBookingForm(formattedDate: string): void {
    const formDataToSend = {
      ...this.formData,
      preferredDate: formattedDate,
      user: { id: this.userId },
      center: { id: Number(this.selectedCenterId) },
      selectedCarDetails: this.selectedCar.name,
    };
    console.log(formDataToSend);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.apiUrl, formDataToSend, { headers }).subscribe(
      (response) => {
        console.log('Booking successful:', response);
        this.showSuccessDialog();
      },
      (error) => {
        console.error('Booking failed:', error);
        this.showFailureDialog();
      }
    );
  }

  confirmBooking(): void {
    this.formData.confirmation = true;
    this.submitForm();
  }

  notAgreed(): void {
    this.formData.confirmation = false;
    this.submitForm();
  }

  isStepValid(): any {
    if (this.currentStep === 1) {
      // Step 1: Check if all required fields are valid
      return (
        this.formData.name?.trim() &&
        this.formData.phone?.trim() &&
        this.formData.phone?.length === 10 &&
        /^\d{10}$/.test(this.formData.phone) &&
        this.formData.email?.trim() &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          this.formData.email
        )
      );
    } else if (this.currentStep === 2) {
      // Step 2: Check if all required fields are valid
      return (
        this.formData.preferredDate &&
        this.selectedCenterId &&
        this.formData.timeSlot
      );
    } else if (this.currentStep === 3) {
      // Step 3: Always valid as it is just a confirmation step
      return true;
    }
    return false;
  }

  showSuccessDialog(): void {
    this.closeForm();
    Swal.fire({
      title: '🎉 Slot Booked Successfully!',
      text: 'Your test drive slot has been booked. We will send a confirmation receipt to your registered email!',
      imageUrl: 'assets/images/success.gif',
      imageWidth: 400,
      imageHeight: 300,
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }

  showFailureDialog(): void {
    this.closeForm();
    Swal.fire({
      title: '❌ Slot Booking Failed!',
      text: 'There are currently no slots available for the given details. Please try again after some time! ',
      imageUrl: 'assets/images/fail.gif',
      imageWidth: 400,
      imageHeight: 300,
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
  }
}

//hey I have used cron for daily reset of the slot bookings
// ┌───────────── Second (0–59)
// │ ┌───────────── Minute (0–59)
// │ │ ┌───────────── Hour (0–23)
// │ │ │ ┌───────────── Day of Month (1–31)
// │ │ │ │ ┌───────────── Month (1–12 or JAN–DEC)
// │ │ │ │ │ ┌───────────── Day of Week (0–7 or SUN–SAT, 0 and 7 both mean Sunday)
// │ │ │ │ │ │
// * * * * * *

// 0 0 0 * * *: Runs every day at midnight.
// 0 */5 * * * *: Runs every 5 minutes.
// 0 0 12 * * *: Runs daily at 12:00 PM.
// 0 0 0 1 1 *: Runs yearly on January 1 at midnight
