// import { CommonModule } from '@angular/common';
// import { Component, AfterViewInit } from '@angular/core';
// import { HeaderComponent } from "../header/header.component";
// import { FooterComponent } from "../footer/footer.component";
// import L from 'leaflet';

// @Component({
//   selector: 'app-location',
//   standalone:true,
//   templateUrl: './location.component.html',
//   styleUrls: ['./location.component.css'],
//   imports: [HeaderComponent, FooterComponent,CommonModule],
// })
// export class LocationComponent implements AfterViewInit {
//   shops = [
//     {
//       name: 'Car Shop 1',
//       address: 'No. 5, Mount Road, Chennai',
//       lat: 13.0827,
//       lng: 80.2707,
//       icon: 'https://img.icons8.com/color/48/000000/car.png' // Car icon
//     },
//     {
//       name: 'Car Shop 2',
//       address: 'No. 12, Old Mahabalipuram Road, Chennai',
//       lat: 12.9716,
//       lng: 80.2519,
//       icon: 'https://img.icons8.com/color/48/000000/wrench.png' // Wrench icon
//     },
//     {
//       name: 'Car Shop 3',
//       address: 'No. 7, ECR Road, Chennai',
//       lat: 13.0067,
//       lng: 80.2575,
//       icon: 'https://img.icons8.com/color/48/000000/car.png' // Car icon
//     },
//     {
//       name: 'Car Shop 4',
//       address: 'No. 10, Adyar Main Road, Chennai',
//       lat: 13.0033,
//       lng: 80.2602,
//       icon: 'https://img.icons8.com/color/48/000000/wrench.png' // Wrench icon
//     },
//   ];

//   private map: any;

//   ngAfterViewInit(): void {
//     this.initMap();
//   }

//   private initMap(): void {
//     this.map = L.map('map').setView([13.0827, 80.2707], 12); // Initial map center and zoom

//     // Tile layer for the map (OpenStreetMap)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors',
//     }).addTo(this.map);

//     // Add markers with popups for each shop
//     this.shops.forEach((shop) => {
//       const marker = L.marker([shop.lat, shop.lng])
//         .addTo(this.map)
//         .bindPopup(`
//           <b>${shop.name}</b><br>
//           ${shop.address}
//         `);

//       // Custom icons for the markers
//       marker.setIcon(
//         L.icon({
//           iconUrl: shop.icon, // Custom icon for each shop
//           iconSize: [30, 30], // Icon size
//           iconAnchor: [15, 30], // Anchor position
//           popupAnchor: [0, -30], // Popup position
//         })
//       );
//     });
//   }
// }
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import L from 'leaflet';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  standalone:true,
  styleUrls: ['./location.component.css'],
  imports: [HeaderComponent]
})
export class LocationComponent implements AfterViewInit {
  shops: any[] = [];  // Array to store shop data
  private map: any;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.fetchShops();  // Call to fetch shops after the view is initialized
  }

  fetchShops(): void {
    // Make the HTTP request to fetch data from the Spring Boot API
    this.http.get('http://localhost:8080/locations')
      .subscribe(
        (data: any) => {
          console.log('API Data:', data);  // Log the API response to check the structure
          this.shops = data;  // Assign the API data to the shops array
          this.initMap();  // Initialize the map after data is fetched
        },
        error => {
          console.error('There was an error fetching shops!', error);
        }
      );
  }

  private initMap(): void {
    // Initialize the map
    this.map = L.map('map').setView([13.0827, 80.2707], 12);  // Set the map center and zoom level

    // Add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Loop through the fetched shops and add markers to the map
    this.shops.forEach((shop) => {
      const marker = L.marker([shop.lat, shop.lng])
        .addTo(this.map)
        .bindPopup(`<b>${shop.name}</b><br>${shop.address}`);

      // Set custom icons for the markers
      marker.setIcon(
        L.icon({
          iconUrl: shop.icon,  // Custom icon URL
          iconSize: [30, 30],  // Icon size
          iconAnchor: [15, 30],  // Position of the icon anchor
          popupAnchor: [0, -30],  // Position of the popup
        })
      );
    });
  }
}
