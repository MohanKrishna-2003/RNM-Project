import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import L from 'leaflet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDataServiceService } from '../../Services/common-data-service.service';
 
// Define an interface for a shop
interface Center {
  id: string;
  name: string;
  address: string;
  availableSlots: number;
  morningSlots: number;
  afternoonSlots: number;
  eveningSlots: number;
  lat: number;
  lng: number;
  icon: string;
}
 
@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  imports: [ HttpClientModule, CommonModule, FormsModule],
})
export class LocationComponent implements AfterViewInit {
  shops: Center[] = [];
  private map: any;
 
  constructor(private http: HttpClient, private commonservice : CommonDataServiceService) {}
 
  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => {
      this.loadShops();
    }, 100);
  }
 
  private loadShops(): void {
    this.commonservice.getCenterDetails().subscribe( (data) => {
          console.log('Fetched shops data:', data);
          this.shops = this.commonservice.getFilteredCenterDetails(data);
          this.addMarkers();
        },
        (error) => {
          console.error('Error fetching shops:', error);
        }
      );
    // const apiUrl = 'http://localhost:8080/showrooms/locations';
    // this.http.get<Shop[]>(apiUrl).subscribe(
    //   (data) => {
    //     console.log('Fetched shops data:', data);
    //     this.shops = data;
    //     this.addMarkers();
    //   },
    //   (error) => {
    //     console.error('Error fetching shops:', error);
    //   }
    // );
  }
 
  private initMap(): void {
    this.map = L.map('map').setView([13.0827, 80.2707], 12);
 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
  }
 
  private addMarkers(): void {
    if (this.shops.length === 0) {
      console.log('No shops to display');
    }
 
    this.shops.forEach((shop) => {
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
 
      marker.setIcon(
        L.icon({
          iconUrl: shop.icon,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        })
      );
    });
  }
 
  // New method to handle the shop click event
  goToShopLocation(shop: Center): void {
    // Center the map at the clicked shop's coordinates and zoom in
    this.map.setView([shop.lat, shop.lng], 16); // Adjust zoom level (14) as needed
  }
}