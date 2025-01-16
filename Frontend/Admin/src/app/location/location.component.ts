import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';

// import * as L from 'leaflet';

@Component({
  selector: 'app-location',
  standalone:true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  imports: [CommonModule],
})
export class LocationComponent implements AfterViewInit {
  shops = [
    {
      name: 'Car Shop 1',
      address: 'No. 5, Mount Road, Chennai',
      lat: 13.0827,
      lng: 80.2707,
      icon: 'https://img.icons8.com/color/48/000000/car.png' // Car icon
    },
    {
      name: 'Car Shop 2',
      address: 'No. 12, Old Mahabalipuram Road, Chennai',
      lat: 12.9716,
      lng: 80.2519,
      icon: 'https://img.icons8.com/color/48/000000/wrench.png' // Wrench icon
    },
    {
      name: 'Car Shop 3',
      address: 'No. 7, ECR Road, Chennai',
      lat: 13.0067,
      lng: 80.2575,
      icon: 'https://img.icons8.com/color/48/000000/car.png' // Car icon
    },
    {
      name: 'Car Shop 4',
      address: 'No. 10, Adyar Main Road, Chennai',
      lat: 13.0033,
      lng: 80.2602,
      icon: 'https://img.icons8.com/color/48/000000/wrench.png' // Wrench icon
    },
  ];
 
  private map: any;
 
  ngAfterViewInit(): void {
    // this.initMap();
  }
 
  // private initMap(): void {
  //   this.map = L.map('map').setView([13.0827, 80.2707], 12); // Initial map center and zoom
 
  //   // Tile layer for the map (OpenStreetMap)
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; OpenStreetMap contributors',
  //   }).addTo(this.map);
 
  //   // Add markers with popups for each shop
  //   this.shops.forEach((shop) => {
  //     const marker = L.marker([shop.lat, shop.lng])
  //       .addTo(this.map)
  //       .bindPopup(`
  //         <b>${shop.name}</b><br>
  //         ${shop.address}
  //       `);
 
  //     // Custom icons for the markers
  //     marker.setIcon(
  //       L.icon({
  //         iconUrl: shop.icon, // Custom icon for each shop
  //         iconSize: [30, 30], // Icon size
  //         iconAnchor: [15, 30], // Anchor position
  //         popupAnchor: [0, -30], // Popup position
  //       })
  //     );
  //   });
  // }
}
 