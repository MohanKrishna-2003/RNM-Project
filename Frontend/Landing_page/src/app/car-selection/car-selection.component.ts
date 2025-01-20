import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import carsData from '../../assets/cars.json';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-selection',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.css']
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
  selectedBrand: string = 'Renault';
  isBookingClicked: boolean = false;
  selectedCar: any = null;
  // showBox : boolean = false;
  // constructor() { }

  ngOnInit(): void {
    this.cars = carsData;
    this.displayedCars = [...this.cars];
    this.startImageCycle();
    this.handleScroll();
    this.displayCars('Renault')
  }

  displayCars(brand: string): void {
    this.showFilters = true;
    if (brand) {
      this.displayedCars = this.cars.filter(car => car.brand === brand);
      this.showGif = false;
    } else {
      this.displayedCars = [...this.cars];
      this.showGif = false;
    }
  }

  startImageCycle(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.staticPics.length;
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

  isFilterSidebarOpen: boolean = false;
  selectedPrice: string = '';
  sortBy: string = '';


  toggleFilterSidebar(): void {
    this.isFilterSidebarOpen = !this.isFilterSidebarOpen;
  }

  toggleBooking(carName: String) {
    this.isBookingClicked = !this.isBookingClicked;
    this.selectedCar = carsData.find(car => car.name == carName);
    console.log(this.selectedCar);

  }

  closeForm() {
    this.isBookingClicked = !this.isBookingClicked;
  }
  applyFilters(): void {
    //   this.toggleFilterSidebar()
    //   console.log(this.selectedPrice)
    //   if (this.selectedPrice) {
    //     this.filterCarsByPrice();
    //   }
    //   // else if(this.sortBy())
    //   else {
    //     this.displayedCars = [...this.cars];
    //   }

    this.showGif = false;
  }


  filterCarsByPrice(event: Event): void {
    const selectedPrice = (event?.target as HTMLSelectElement).value;
    this.displayedCars = this.cars.filter(car => {
      const rawPrice = car.price?.INR;
      if (!rawPrice)
        return false;
      const normalizedPrice = this.normalizePrice(rawPrice);
      switch (selectedPrice) {
        case 'low':
          return normalizedPrice < 1000000;
        case 'mid':
          return normalizedPrice >= 1000000 && normalizedPrice <= 2000000;
        case 'high':
          return normalizedPrice > 2000000;
        default:
          return true;
      }
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
    return parseFloat(numericPrice) || 0;
  }

  confirm() {
    alert("Your booking slot is confirmed... please await further instructions.....");
  }
  sortByOrder(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value;
    if (sortBy == 'maxPrice') {
      this.displayedCars = this.cars.sort((a, b) => this.normalizePrice(b.price.INR) - this.normalizePrice(a.price.INR));
    }
    else if (sortBy == 'minPrice') {
      this.displayedCars = this.cars.sort((a, b) => this.normalizePrice(a.price.INR) - this.normalizePrice(b.price.INR));
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;


  }

  filterByRating(event: Event): void {
    const selectedRating = (event.target as HTMLSelectElement).value;
    // console.log(selectedRating);
    this.displayedCars = this.cars.filter(car => car.rating == selectedRating);
    this.showGif = false;
  }

  filterByEngine(event: Event): void {
    const selectedEngineType = (event.target as HTMLSelectElement).value;
    if (selectedEngineType) {
      this.displayedCars = this.cars.filter(car => car.engineType.trim().toLowerCase() === selectedEngineType.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;

  }

  filterBySeater(event: Event): void {
    const selectedSeatingCapacity = (event.target as HTMLSelectElement).value;
    if (selectedSeatingCapacity) {
      this.displayedCars = this.cars.filter(car => car.seater == selectedSeatingCapacity);
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByTransmission(event: Event): void {
    const selectedTransmission = (event.target as HTMLSelectElement).value;
    if (selectedTransmission) {
      this.displayedCars = this.cars.filter(car => car.transmission.trim().toLowerCase() === selectedTransmission.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByAvailability(event: Event): void {
    const selectedAvailability = (event.target as HTMLSelectElement).value;
    if (selectedAvailability) {
      this.displayedCars = this.cars.filter(car => car.availability.trim().toLowerCase() === selectedAvailability.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByFuelEfficiency(event: Event): void {
    const selectedFuelEfficiency = (event.target as HTMLSelectElement).value;
    if (selectedFuelEfficiency) {
      this.displayedCars = this.cars.filter(car => car.fuelEfficiency.trim().toLowerCase() === selectedFuelEfficiency.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByColor(event: Event): void {
    const selectedColor = (event.target as HTMLSelectElement).value;
    if (selectedColor) {
      this.displayedCars = this.cars.filter(car => car.color.trim().toLowerCase() === selectedColor.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByDriveType(event: Event): void {
    const selectedDriveType = (event.target as HTMLSelectElement).value;
    if (selectedDriveType) {
      this.displayedCars = this.cars.filter(car => car.driveType.trim().toLowerCase() === selectedDriveType.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }

  filterByWarranty(event: Event): void {
    const selectedWarranty = (event.target as HTMLSelectElement).value;
    if (selectedWarranty) {
      this.displayedCars = this.cars.filter(car => car.warranty.trim().toLowerCase() === selectedWarranty.toLowerCase());
    }
    else {
      this.displayedCars = [...this.cars];
    }
    this.showGif = false;
  }




  status: boolean = true;
  clickEvent() {
    this.status = !this.status;
  }

  currentStep: number = 1; // Keeps track of the current step in the form


  // saving the form to backend! - mohan.

  formData = {
    name: '',                   // string
    phone: '',                  // string
    email: '',                  // string
    address: '',                // string
    preferredDate: new Date(),  // Date object
    timeSlot: '',               // string
    showroomLocation: '',       // string
    confirmation: false         // boolean
  };

  private apiUrl = 'http://localhost:8080/slot-bookings';

  constructor(private http: HttpClient) {
    // this.showSuccessDialog();
    // this.showFailureDialog();

    // so here, If we want to display some of the dates as blocked we want to again use here flatpickr library.
    // so yar, if you think it's needed that much we will udpate this further okay :-)
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
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
    const formattedDate = this.formData.preferredDate ? this.formData.preferredDate.toISOString() : '';
    const formDataToSend = {
      ...this.formData,
      preferredDate: formattedDate,
      selectedCarDetails: this.selectedCar
    };

    console.log(formDataToSend);  // Checking the data being sent to the backend

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.apiUrl, formDataToSend, { headers }).subscribe(
      (response) => {
        // console.log("Success: ", response);
        // alert("Slot Booked Successfully!");
        this.showSuccessDialog();
      },
      (error) => {
        // console.log("Error: ", error);
        // alert("Failed to book a slot! Please, try again later.");
        this.showFailureDialog();
      }
    );
  }

  todayDate: String;


  confirmBooking(): void {
    this.formData.confirmation = true;
    this.submitForm();
  }

  notAgreed(): void {
    this.formData.confirmation = false;
    this.submitForm();
  }


  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.formData.name && !!this.formData.phone && !!this.formData.email;
      case 2:
        return !!this.formData.preferredDate && !!this.formData.timeSlot && !!this.formData.showroomLocation;
      case 3:
        return true;
      default:
        return false;
    }
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
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
  showFailureDialog(): void {
    this.closeForm();
    Swal.fire({
      title: '❌ Slot Booking Failed!',
      text: 'There was an issue booking your test drive slot. Please try again later.',
      imageUrl: 'assets/images/fail.gif',
      imageWidth: 400,
      imageHeight: 300,
      confirmButtonText: 'Try Again',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
}
