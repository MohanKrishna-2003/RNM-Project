import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Map, Marker } from 'leaflet';
import { FormsModule } from '@angular/forms';

interface Shop {
  id: number;
  name: string;
  address: string;
  lat: number;
  long: number;
  icon: string;
}

@Component({
  selector: 'app-location',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  shops: Shop[] = [];
  private map: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.http.get<Shop[]>('http://localhost:8080/locations').subscribe((res) => {
      console.log(res);
      this.shops = res;

      if (isPlatformBrowser(this.platformId)) {
        // Dynamically import leaflet only in the browser
        import('leaflet').then((L) => {
          this.initMap(L);
        });
      }
    });
  }

  private initMap(L: any): void {
    // Initialize map here
    this.map = L.map('map').setView([13.0827, 80.2707], 12); // Initial map center and zoom

    // Tile layer for the map (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Add markers with popups for each shop
    this.shops.forEach((shop) => {
      const marker = L.marker([shop.lat, shop.long]).addTo(this.map).bindPopup(`
        <b>${shop.name}</b><br>
        ${shop.address}
      `);

      // You can add custom icons if needed
      // marker.setIcon(L.icon({
      //   iconUrl: shop.icon,
      //   iconSize: [30, 30],
      //   iconAnchor: [15, 30],
      //   popupAnchor: [0, -30],
      // }));
    });
  }
}
