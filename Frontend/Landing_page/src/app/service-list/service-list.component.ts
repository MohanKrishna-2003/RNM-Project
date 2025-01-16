// service-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-list',
  standalone:true,
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  imports: [CommonModule]
})
export class ServiceListComponent {
  services = [
    {
      title: 'Schedule a Test Drive',
      description:
        'Easily schedule a test drive at your preferred time and location. We offer flexible booking options to fit your schedule.',
      image: 'testdrive.jpg',
      reverseOrder: false, // image on left
    },
    {
      title: '24 x 7 Assistance',
      description:
        'We have tied up with RNM Auto Assist (India) Limited to ensure that you get immediate and hassle-free service in the event of any car breakdown. Our network for roadside assistance covers cities, highways, and hilly terrains across India.',
      image: 'assistance.jpg',
      reverseOrder: true, // image on right
    },
    {
      title: 'Value Care (AMC)',
      description:
        'Value Care (AMC) is a maintenance plan that guarantees protection against unexpected repairs & provides substantial savings through protection against inflation and price volatility of consumables. It covers all services and repairs including labor, parts & consumables.',
      image: 'value.jpg',
      reverseOrder: false, // image on left
    },
  ];
}
