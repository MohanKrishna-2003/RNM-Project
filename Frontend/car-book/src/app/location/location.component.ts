import { Component, OnInit } from '@angular/core';
 
// Declare the global variable for Leaflet
declare var L: any;
 
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
 
  constructor() { }
 
  ngOnInit(): void {
    this.initMap();
  }
 
  initMap(): void {
    // Initialize the map with Chennai's latitude and longitude
    const map = L.map('map').setView([13.0827, 80.2707], 12); // Coordinates for Chennai
 
    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
 
    // Define the car shop locations for Renault, Nissan, and Mitsubishi
    const carShops = [
      { name: 'Car Shop 1', lat: 13.0878, lng: 80.2777, address: 'No. 5, Mount Road, Chennai' },
      { name: 'Car Shop 2', lat: 13.0128, lng: 80.2215, address: 'No. 12, Old Mahabalipuram Road, Chennai' },
      { name: 'Car Shop 3', lat: 13.0087, lng: 80.2193, address: 'No. 7, ECR Road, Chennai' },
      { name: 'Car Shop 4', lat: 13.0065, lng: 80.2675, address: 'No. 10, Adyar Main Road, Chennai' },
      { name: 'Car Shop 5', lat: 13.0765, lng: 80.2552, address: 'No. 22, Poonamallee High Road, Chennai' }
    ];
 
    // Array of FontAwesome icons (using the classes from FontAwesome)
    const randomIcons = [
      'fas fa-car', // Car icon
      'fas fa-wrench', // Wrench icon (for service-related)
      'fas fa-tools', // Tools icon
      'fas fa-cogs', // Gear icon
      'fas fa-gas-pump' // Gas pump icon
    ];
 
    // Loop through the car shop locations and add a marker with random icon
    carShops.forEach(shop => {
      // Pick a random FontAwesome icon from the list
      const randomIconClass = randomIcons[Math.floor(Math.random() * randomIcons.length)];
 
      // Create a custom icon using FontAwesome icon class
      const icon = L.divIcon({
        className: randomIconClass,  // Use the class for FontAwesome icon
        iconSize: [40, 40], // Size of the icon
        iconAnchor: [20, 40], // Anchor point
        popupAnchor: [0, -40], // Popup position relative to the icon
      });
 
      // Add a marker with the random FontAwesome icon for each car shop
      L.marker([shop.lat, shop.lng], { icon: icon })
        .addTo(map)
        .bindPopup(`<b>${shop.name}</b><br>${shop.address}`)
        .openPopup();
    });
  }
}