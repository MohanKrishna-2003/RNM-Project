import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import L from 'leaflet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Define an interface for a shop
interface Shop {
  name: string;
  address: string;
  lat: number;
  lng: number;
  icon: string; // The URL for the shop's icon
}

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  imports: [HeaderComponent, FooterComponent, HttpClientModule, CommonModule, FormsModule],
})
export class LocationComponent implements AfterViewInit {
  shops: Shop[] = []; // Apply the Shop type to the array
  private map: any;

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();  // Initialize the map
    setTimeout(() => {
      this.loadShops(); // Load shop data after a small delay
    }, 100);
  }

  // Fetch shop data from an API
  private loadShops(): void {
    const apiUrl = 'http://localhost:8080/locations'; // Replace with your actual API URL
    this.http.get<Shop[]>(apiUrl).subscribe(
      (data) => {
        console.log('Fetched shops data:', data);  // Log the fetched data
        this.shops = data; // Populate the shops array with data from the API
        this.addMarkers(); // Add markers for each shop on the map
      },
      (error) => {
        console.error('Error fetching shops:', error);
      }
    );
  }

  // Initialize the map
  private initMap(): void {
    this.map = L.map('map').setView([13.0827, 80.2707], 12); // Initial map center and zoom

    // Tile layer for the map (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }

  // Add markers to the map based on fetched shops data
  private addMarkers(): void {
    if (this.shops.length === 0) {
      console.log('No shops to display');
    }

    this.shops.forEach((shop) => {
      // Check for valid coordinates
      if (isNaN(shop.lat) || isNaN(shop.lng)) {
        console.error(`Invalid coordinates for shop: ${shop.name}`);
        return;
      }
      console.log(`Adding marker for ${shop.name} at lat: ${shop.lat}, lng: ${shop.lng}`);

      const marker = L.marker([shop.lat, shop.lng])
        .addTo(this.map)
        .bindPopup(`
          <b>${shop.name}</b><br>
          ${shop.address}
        `);

      // Custom icons for the markers
      marker.setIcon(
        L.icon({
          iconUrl: shop.icon,  // Use custom icon for each shop
          iconSize: [30, 30],   // Adjust size
          iconAnchor: [15, 30], // Anchor the icon properly
          popupAnchor: [0, -30], // Adjust the popup position
        })
      );
    });
  }
}
