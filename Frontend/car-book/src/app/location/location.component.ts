import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

// Declare the global variable for Leaflet
declare var L: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  standalone: true,
  imports: [CommonModule]  // Import CommonModule to enable ngClass and other Angular directives
})
export class LocationComponent implements OnInit {
  carShops = [
    { name: 'Car Shop 1', lat: 13.0878, lng: 80.2777, address: 'No. 5, Mount Road, Chennai', iconClass: 'fas fa-car' },
    { name: 'Car Shop 2', lat: 13.0128, lng: 80.2215, address: 'No. 12, Old Mahabalipuram Road, Chennai', iconClass: 'fas fa-wrench' },
    { name: 'Car Shop 3', lat: 13.0087, lng: 80.2193, address: 'No. 7, ECR Road, Chennai', iconClass: 'fas fa-tools' },
    { name: 'Car Shop 4', lat: 13.0065, lng: 80.2675, address: 'No. 10, Adyar Main Road, Chennai', iconClass: 'fas fa-cogs' },
    { name: 'Car Shop 5', lat: 13.0765, lng: 80.2552, address: 'No. 22, Poonamallee High Road, Chennai', iconClass: 'fas fa-gas-pump' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const map = L.map('map').setView([13.0827, 80.2707], 12); // Coordinates for Chennai

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each car shop with their respective icons
    this.carShops.forEach(shop => {
      const icon = L.divIcon({
        className: shop.iconClass,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      L.marker([shop.lat, shop.lng], { icon: icon })
        .addTo(map)
        .bindPopup(`<b>${shop.name}</b><br>${shop.address}`)
        .openPopup();
    });
  }
}
